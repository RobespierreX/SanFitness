import React, { useState, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import UserAvatar from './UserAvatar';

interface Props {
    onPostCreated: () => void;
    userAvatar?: string;
    userName?: string;
}

const CreatePost: React.FC<Props> = ({ onPostCreated, userAvatar, userName = 'Usuario' }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!content.trim() && !file) return;
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            let imageUrl = null;

            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${user.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('imagenes-posts')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('imagenes-posts')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const { error: insertError } = await supabase
                .from('posts')
                .insert({
                    user_id: user.id,
                    content: content,
                    image_url: imageUrl,
                    author_name: user.user_metadata.full_name || userName || 'Usuario',
                    avatar_url: userAvatar || '',
                });

            if (insertError) throw insertError;

            setContent('');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            onPostCreated();

        } catch (error: any) {
            console.error('Error creating post:', error);
            alert('Error creating post: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-card border border-border-light dark:border-white/5 overflow-hidden transition-all mb-8">
            <div className="p-4">
                <div className="flex gap-4">
                    <UserAvatar name={userName} avatarUrl={userAvatar} size="md" />
                    <div className="flex-1">
                        <textarea
                            className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 resize-none h-20 text-base"
                            placeholder="¿Qué estás pensando?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        {file && (
                            <div className="mt-2 text-sm text-primary flex items-center gap-2">
                                <span className="material-symbols-outlined">image</span>
                                {file.name}
                                <button onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="text-red-500 hover:text-red-700">
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-slate-50/50 dark:bg-white/5 px-4 py-3 flex items-center justify-between border-t border-border-light dark:border-white/5">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 transition-colors"
                        title="Añadir Foto"
                    >
                        <span className="material-symbols-outlined text-[20px]">image</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || (!content.trim() && !file)}
                    className="bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 text-sm font-bold px-6 py-2 rounded-lg transition-all shadow-sm shadow-primary/20"
                >
                    {loading ? 'Publicando...' : 'Publicar'}
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
