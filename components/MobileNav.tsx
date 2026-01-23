
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const MobileNav: React.FC = () => {
    const { t } = useLanguage();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-white/10 px-6 py-3 flex justify-between items-center z-50 safe-area-bottom">
            <Link to="/dashboard" className={`flex flex-col items-center gap-1 group ${isActive('/dashboard') ? 'text-primary' : 'text-slate-400 dark:text-white/60'}`}>
                <span className={`material-symbols-outlined text-2xl transition-transform group-active:scale-95 ${isActive('/dashboard') ? 'filled' : ''}`}>grid_view</span>
                <span className="text-[10px] font-medium">Dash</span>
            </Link>
            <Link to="/nutrition" className={`flex flex-col items-center gap-1 group ${isActive('/nutrition') ? 'text-primary' : 'text-slate-400 dark:text-white/60'}`}>
                <span className={`material-symbols-outlined text-2xl transition-transform group-active:scale-95 ${isActive('/nutrition') ? 'filled' : ''}`}>restaurant</span>
                <span className="text-[10px] font-medium">Nutri</span>
            </Link>
            <div className="relative -top-5">
                <Link to="/workouts" className="flex items-center justify-center size-14 rounded-full bg-primary text-[#102218] shadow-lg shadow-primary/30 border-4 border-white dark:border-background-dark transform transition-transform active:scale-95">
                    <span className="material-symbols-outlined text-2xl filled">fitness_center</span>
                </Link>
            </div>
            <Link to="/community" className={`flex flex-col items-center gap-1 group ${isActive('/community') ? 'text-primary' : 'text-slate-400 dark:text-white/60'}`}>
                <span className={`material-symbols-outlined text-2xl transition-transform group-active:scale-95 ${isActive('/community') ? 'filled' : ''}`}>groups</span>
                <span className="text-[10px] font-medium">Social</span>
            </Link>
            <Link to="/profile" className={`flex flex-col items-center gap-1 group ${isActive('/profile') ? 'text-primary' : 'text-slate-400 dark:text-white/60'}`}>
                <span className={`material-symbols-outlined text-2xl transition-transform group-active:scale-95 ${isActive('/profile') ? 'filled' : ''}`}>person</span>
                <span className="text-[10px] font-medium">Profile</span>
            </Link>
        </nav>
    );
};

export default MobileNav;
