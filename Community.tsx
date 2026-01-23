import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import CreatePost from './components/CreatePost';
import UserAvatar from './components/UserAvatar';

interface Post {
  id: string;
  user_id: string;
  author_name: string;
  avatar_url?: string;
  created_at: string;
  content: string;
  image_url?: string;
  likes: number;
  comments: number;
  user_has_liked?: boolean;
}

interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  author_name?: string;
  avatar_url?: string;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string>('');
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // State for comments
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [currentPostComments, setCurrentPostComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      // Try to get avatar from metadata or profile table if needed
      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url, full_name')
        .eq('id', user.id)
        .single();

      setCurrentUserAvatar(profile?.avatar_url || user.user_metadata.avatar_url || '');
      setCurrentUserName(profile?.full_name || user.user_metadata.full_name || user.email || 'Usuario');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) {
        throw error;
      }

      // Optimistically update UI
      setPosts(posts.filter(p => p.id !== postId));

    } catch (error: any) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar la publicación: ' + error.message);
    }
  };

  const handleLike = async (post: Post) => {
    if (!currentUserId) return;

    // Optimistic UI update
    const previousPosts = [...posts];
    const newHasLiked = !post.user_has_liked;
    const newLikesCount = newHasLiked ? post.likes + 1 : post.likes - 1;

    setPosts(posts.map(p =>
      p.id === post.id
        ? { ...p, likes: newLikesCount, user_has_liked: newHasLiked }
        : p
    ));

    try {
      if (newHasLiked) {
        const { error } = await supabase
          .from('post_likes')
          .insert({ user_id: currentUserId, post_id: post.id });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .match({ user_id: currentUserId, post_id: post.id });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update
      setPosts(previousPosts);
    }
  };

  const fetchComments = async (postId: string) => {
    setLoadingComments(true);
    setCurrentPostComments([]); // Clear previous comments while loading

    try {
      const { data: comments, error } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (comments) {
        // Enrich comments with author info
        const userIds = Array.from(new Set(comments.map(c => c.user_id)));

        let profilesMap: Record<string, any> = {};
        if (userIds.length > 0) {
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url')
            .in('id', userIds);

          profilesMap = (profilesData || []).reduce((acc, profile) => {
            acc[profile.id] = profile;
            return acc;
          }, {} as Record<string, any>);
        }

        const enrichedComments = comments.map(comment => ({
          ...comment,
          author_name: profilesMap[comment.user_id]?.full_name || 'Usuario',
          avatar_url: profilesMap[comment.user_id]?.avatar_url
        }));

        setCurrentPostComments(enrichedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const toggleComments = (postId: string) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
    } else {
      setActiveCommentPostId(postId);
      fetchComments(postId);
    }
  };

  const handlePostComment = async (postId: string) => {
    if (!newCommentText.trim() || !currentUserId) return;

    try {
      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          user_id: currentUserId,
          post_id: postId,
          content: newCommentText.trim()
        })
        .select()
        .single();

      if (error) throw error;

      // Optimistically update comment list
      const newComment: Comment = {
        ...data,
        author_name: currentUserName,
        avatar_url: currentUserAvatar
      };

      setCurrentPostComments([...currentPostComments, newComment]);
      setNewCommentText('');

      // Update post comment count (optimistic)
      setPosts(posts.map(p =>
        p.id === postId ? { ...p, comments: p.comments + 1 } : p
      ));

    } catch (error) {
      console.error('Error posting comment:', error);
      alert('No se pudo publicar el comentario.');
    }
  };

  const handleDeleteComment = async (commentId: string, postId: string) => {
    if (!window.confirm('¿Borrar comentario?')) return;

    try {
      const { error } = await supabase
        .from('post_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      setCurrentPostComments(currentPostComments.filter(c => c.id !== commentId));

      // Update post comment count (optimistic)
      setPosts(posts.map(p =>
        p.id === postId ? { ...p, comments: Math.max(0, p.comments - 1) } : p
      ));

    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);

    // First fetch the current user to ensure we have the ID for checking likes
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    const { data: postsData, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
      return;
    }

    if (postsData) {
      // 1. Fetch profiles for authors
      const userIds = Array.from(new Set(postsData.map(p => p.user_id)));

      // 2. Fetch likes by current user
      let likedPostIds = new Set<string>();
      if (userId) {
        const { data: likesData } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', userId);

        if (likesData) {
          likedPostIds = new Set(likesData.map(l => l.post_id));
        }
      }

      let profilesMap: Record<string, any> = {};
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        profilesMap = (profilesData || []).reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>);
      }

      const enrichedPosts = postsData.map(post => ({
        ...post,
        avatar_url: profilesMap[post.user_id]?.avatar_url || post.avatar_url,
        author_name: profilesMap[post.user_id]?.full_name || post.author_name,
        user_has_liked: likedPostIds.has(post.id)
      }));

      setPosts(enrichedPosts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full bg-background-subtle dark:bg-background-dark transition-colors overflow-y-auto antialiased hide-scrollbar">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Main Feed */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0 w-full space-y-6">

            <CreatePost onPostCreated={fetchPosts} userAvatar={currentUserAvatar} userName={currentUserName} />

            {/* Post Feed */}
            {loading ? (
              <div className="text-center text-gray-500 py-10">Cargando publicaciones...</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-gray-500 py-10">¡Sé el primero en publicar algo!</div>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-surface-dark rounded-xl shadow-card border border-border-light dark:border-white/5 overflow-hidden transition-all animate-fade-in-up">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={post.author_name} avatarUrl={post.avatar_url} size="lg" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">{post.author_name}</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-white/40">{new Date(post.created_at).toLocaleDateString()} • {new Date(post.created_at).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    {currentUserId === post.user_id && (
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        title="Eliminar publicación"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    )}
                  </div>

                  <div className="px-4 pb-3">
                    <p className="text-slate-700 dark:text-white/90 text-[15px] leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {post.image_url && (
                    <div className="w-full aspect-[16/9] bg-slate-100 dark:bg-black/20 bg-cover bg-center" style={{ backgroundImage: `url("${post.image_url}")` }}></div>
                  )}

                  <div className="px-4 py-3 border-t border-border-light dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLike(post)}
                          className={`flex items-center gap-2 group transition-colors ${post.user_has_liked ? 'text-red-500' : 'text-slate-500 dark:text-white/40 hover:text-red-500'}`}
                        >
                          <span className={`material-symbols-outlined ${post.user_has_liked ? 'filled' : 'group-hover:filled'}`}>favorite</span>
                          <span className="text-sm font-bold">{post.likes}</span>
                        </button>
                        <button
                          onClick={() => toggleComments(post.id)}
                          className={`flex items-center gap-2 group transition-colors ${activeCommentPostId === post.id ? 'text-blue-500' : 'text-slate-500 dark:text-white/40 hover:text-blue-500'}`}
                        >
                          <span className={`material-symbols-outlined ${activeCommentPostId === post.id ? 'filled' : 'group-hover:filled'}`}>chat_bubble</span>
                          <span className="text-sm font-bold">{post.comments}</span>
                        </button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {activeCommentPostId === post.id && (
                      <div className="mt-4 pt-4 border-t border-border-light dark:border-white/5 animate-fade-in-up">
                        {loadingComments ? (
                          <div className="text-center text-sm text-gray-500 py-4">Cargando comentarios...</div>
                        ) : (
                          <div className="space-y-4">
                            {/* Comment List */}
                            {currentPostComments.length === 0 ? (
                              <div className="text-center text-sm text-gray-400 py-2">Sé el primero en comentar.</div>
                            ) : (
                              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                {currentPostComments.map(comment => (
                                  <div key={comment.id} className="flex gap-3 text-sm group">
                                    <UserAvatar name={comment.author_name || 'U'} avatarUrl={comment.avatar_url} size="sm" />
                                    <div className="flex-1 bg-slate-50 dark:bg-white/5 rounded-lg p-3">
                                      <div className="flex justify-between items-start">
                                        <span className="font-semibold text-slate-900 dark:text-white text-xs">{comment.author_name}</span>
                                        <span className="text-[10px] text-slate-400">{new Date(comment.created_at).toLocaleDateString()}</span>
                                      </div>
                                      <p className="text-slate-700 dark:text-white/80 mt-1">{comment.content}</p>
                                    </div>
                                    {currentUserId === comment.user_id && (
                                      <button
                                        onClick={() => handleDeleteComment(comment.id, post.id)}
                                        className="self-center text-slate-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <span className="material-symbols-outlined text-base">delete</span>
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* New Comment Input */}
                            <div className="flex items-center gap-3 mt-4">
                              <UserAvatar name={currentUserName} avatarUrl={currentUserAvatar} size="sm" />
                              <div className="flex-1 relative">
                                <input
                                  type="text"
                                  value={newCommentText}
                                  onChange={(e) => setNewCommentText(e.target.value)}
                                  placeholder="Escribe un comentario..."
                                  className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-full py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary dark:text-white placeholder:text-slate-400"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handlePostComment(post.id);
                                  }}
                                />
                                <button
                                  onClick={() => handlePostComment(post.id)}
                                  disabled={!newCommentText.trim()}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <span className="material-symbols-outlined">send</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              )))}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-6">
            {/* Expert Tip Card */}
            <div className="bg-gradient-to-br from-white to-primary/5 dark:from-surface-dark dark:to-primary/10 rounded-xl shadow-card border border-primary/20 p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-6xl text-primary">lightbulb</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary-dark dark:text-primary">
                  <span className="material-symbols-outlined text-[20px]">science</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Tip de Experto</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/80 leading-relaxed mb-4">
                "La recuperación no es pasiva. La recuperación activa aumenta el flujo sanguíneo y reduce la acumulación de ácido láctico más rápido que el descanso completo."
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Community;
