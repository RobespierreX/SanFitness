import React from 'react';

interface UserAvatarProps {
    name: string;
    avatarUrl?: string | null;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, avatarUrl, size = 'md', className = '' }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    // Colores suaves y modernos para el fondo
    const colors = [
        'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
        'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
        'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',
        'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'
    ];

    // Usar el nombre para seleccionar un color consistente
    const colorIndex = name ? name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length : 0;
    const bgColor = colors[colorIndex];

    const sizeClasses = {
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-12 text-base',
        xl: 'size-14 text-lg'
    };

    // Si hay avatarUrl válida (no placeholder), úsala. Sino, usa la inicial.
    // Nota: Si el usuario desea forzar SIEMPRE letra, podemos comentar la parte de la imagen.
    // Por requerimiento del usuario ("todos... primera letra"), deshabilitamos temporalmente la imagen.
    /*
    if (avatarUrl && !avatarUrl.includes('via.placeholder.com')) {
        return (
            <div
                className={`${sizeClasses[size]} rounded-full bg-cover bg-center shrink-0 border border-slate-100 dark:border-white/10 ${className}`}
                style={{ backgroundImage: `url("${avatarUrl}")` }}
            />
        );
    }
    */

    return (
        <div className={`${sizeClasses[size]} rounded-full ${bgColor} flex items-center justify-center text-white font-bold shadow-sm shrink-0 border border-white/10 ${className}`}>
            {initial}
        </div>
    );
};

export default UserAvatar;
