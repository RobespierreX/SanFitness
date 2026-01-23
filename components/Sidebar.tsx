import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import UserAvatar from './UserAvatar';

interface UserProfile {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-100 dark:border-white/10 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNQKZtceM1pXLhalMeeo--A8T-GePtU4L1ew_BYguuY8qAmEz6Mbs8gO6FoeptV9uCXUPCVQTyArNatBVl6w4_gFA9dz6-kdbT5SE2TNPaB-daEklTj-GErrJQZLYlDia8jIeU_xxa1zwTlTU969z-UvjZtMCnVFJcDG5XWCEHWHy10ujWp_USWvkot45xRguWbTNIpI-IAsXCQMxcMvF4tvt0sxFTOaSnryTl00CXz2TDdrTbdYFukKyXmBWhnU4EPx1AGGhA7-j1")' }}></div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none tracking-tight">SanFitness</h1>
            <p className="text-slate-500 dark:text-white/50 text-xs font-medium tracking-wide uppercase">METABOLIC HUB</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/dashboard') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${isActive('/dashboard') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>grid_view</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>Dashboard</p>
          </Link>
          <Link to="/nutrition" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/nutrition') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-colors ${isActive('/nutrition') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>restaurant</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/nutrition') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>Nutrition</p>
          </Link>
          <Link to="/workouts" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/workouts') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-colors ${isActive('/workouts') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>fitness_center</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/workouts') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>Workouts</p>
          </Link>
          <Link to="/community" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive('/community') ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'}`}>
            <span className={`material-symbols-outlined transition-colors ${isActive('/community') ? 'text-primary-dark' : 'text-slate-400 dark:text-white/60'}`}>groups</span>
            <p className={`text-sm font-semibold transition-colors ${isActive('/community') ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'}`}>Community</p>
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
            <span className="material-symbols-outlined text-slate-400 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">monitor_heart</span>
            <p className="text-slate-500 dark:text-white/60 text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Biometrics</p>
          </a>
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
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </p>
        </button>

        <button
          onClick={() => navigate('/profile')}
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
            <p className="text-primary-dark text-[10px] font-bold uppercase tracking-wider">Pro Member</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
