import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import UserAvatar from './UserAvatar';
import { useLanguage } from '../context/LanguageContext';

interface UserProfile {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('onboarding_complete'); // Optional: clear local onboarding state
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile({
          full_name: user.user_metadata.full_name,
          email: user.email || null,
          avatar_url: user.user_metadata.avatar_url
        });
      }
    };
    fetchUser();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  return (
    <aside className="hidden md:flex w-72 flex-col justify-between border-r border-border-light dark:border-white/5 bg-white dark:bg-background-dark p-6 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)] z-20 transition-all">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="size-10 rounded-full border border-slate-100 dark:border-white/10 shadow-sm overflow-hidden flex items-center justify-center bg-white">
            <img src="/logo.png" alt="SanFitness Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none tracking-tight">SanFitness</h1>
            <p className="text-slate-500 dark:text-white/50 text-xs font-medium tracking-wide uppercase">{t('sidebar.subtitle')}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/dashboard') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${isActive('/dashboard') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>grid_view</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{t('sidebar.dashboard')}</p>
          </Link>
          <Link to="/nutrition" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/nutrition') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-colors ${isActive('/nutrition') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>restaurant</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/nutrition') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{t('sidebar.nutrition')}</p>
          </Link>
          <Link to="/workouts" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/workouts') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-colors ${isActive('/workouts') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>fitness_center</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/workouts') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{t('sidebar.workouts')}</p>
          </Link>
          <Link to="/community" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/community') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-colors ${isActive('/community') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>groups</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/community') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{t('sidebar.community')}</p>
          </Link>
          <Link to="/track-order" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/track-order') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-colors ${isActive('/track-order') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>local_shipping</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/track-order') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{t('sidebar.trackOrder')}</p>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group text-left"
        >
          <span className="material-symbols-outlined text-slate-400 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
          <p className="text-slate-500 dark:text-white/60 text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {isDark ? t('sidebar.lightMode') : t('sidebar.darkMode')}
          </p>
        </button>

        <div className="relative">
          {showProfileMenu && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-border-light dark:border-white/10 overflow-hidden animate-fade-in-up origin-bottom">
              <button
                onClick={() => {
                  navigate('/profile');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
              >
                <span className="material-symbols-outlined text-slate-400 dark:text-white/60 text-xl">person</span>
                <span className="text-sm font-medium text-slate-700 dark:text-white/80">{t('sidebar.viewProfile')}</span>
              </button>
              <div className="h-px bg-slate-100 dark:bg-white/5 mx-2"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left group"
              >
                <span className="material-symbols-outlined text-slate-400 group-hover:text-red-500 transition-colors text-xl">logout</span>
                <span className="text-sm font-medium text-slate-700 dark:text-white/80 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{t('sidebar.logout')}</span>
              </button>
            </div>
          )}
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 px-4 py-4 rounded-xl glass-card transition-all text-left w-full hover:bg-slate-50 dark:hover:bg-white/10 cursor-pointer"
          >
            <div className="relative">
              <UserAvatar
                name={userProfile?.full_name || userProfile?.email || 'Usuario'}
                avatarUrl={userProfile?.avatar_url}
                size="md"
              />
              <div className="absolute bottom-0 right-0 size-3 rounded-full bg-primary border-2 border-white dark:border-[#1a2e22]"></div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight truncate">
                {userProfile?.full_name || userProfile?.email || 'Usuario'}
              </p>
              <p className="text-primary-dark text-[10px] font-bold uppercase tracking-wider">{t('sidebar.member')}</p>
            </div>
            <span className="material-symbols-outlined ml-auto text-slate-400">
              {showProfileMenu ? 'expand_more' : 'expand_less'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
