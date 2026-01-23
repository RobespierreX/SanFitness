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
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string>('');
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string>('');

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

  const fetchPosts = async () => {
    setLoading(true);
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
      // Fetch profiles for these posts to get up-to-date avatar/name
      const userIds = Array.from(new Set(postsData.map(p => p.user_id)));

      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        const profilesMap = (profilesData || []).reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>);

        const enrichedPosts = postsData.map(post => ({
          ...post,
          // Use profile data if available, fallback to post snapshot data
          avatar_url: profilesMap[post.user_id]?.avatar_url || post.avatar_url,
          author_name: profilesMap[post.user_id]?.full_name || post.author_name
        }));

        setPosts(enrichedPosts);
      } else {
        setPosts(postsData);
      }
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

                  <div className="px-4 py-3 flex items-center justify-between border-t border-border-light dark:border-white/5">
                    <div className="flex items-center gap-6">
                      <button
                        className="flex items-center gap-2 group transition-colors text-slate-500 dark:text-white/40 hover:text-primary"
                      >
                        <span className="material-symbols-outlined group-hover:filled">thumb_up</span>
                        <span className="text-sm font-bold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 group text-slate-500 dark:text-white/40 hover:text-blue-500 transition-colors">
                        <span className="material-symbols-outlined group-hover:filled">chat_bubble</span>
                        <span className="text-sm font-bold">{post.comments}</span>
                      </button>
                    </div>
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
