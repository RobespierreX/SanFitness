
import React, { useRef, useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import { Link } from 'react-router-dom';
import WellnessFinder from './components/WellnessFinder';

const Dashboard: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string>('User');
  const [greeting, setGreeting] = useState<string>('Hello');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Intentar obtener el nombre del metadata o perfil
        let name = user.user_metadata.full_name;
        if (!name) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();
          name = profile?.full_name;
        }
        // Usar solo el primer nombre para el saludo si existe
        if (name) {
          setUserName(name.split(' ')[0]);
        } else if (user.email) {
          setUserName(user.email.split('@')[0]);
        }
      }
    };
    fetchUser();

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-subtle dark:bg-background-dark transition-colors">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 p-8 pb-4 z-10 bg-white/50 dark:bg-surface-dark/50 backdrop-blur-sm border-b border-border-light/50 dark:border-white/5 sticky top-0 transition-all">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{greeting}, {userName}</h2>
          <div className="flex items-center gap-2 text-slate-500 dark:text-white/60">
            <span className="material-symbols-outlined text-primary-dark text-lg">trending_up</span>
            <span className="text-sm font-medium">Your metabolic score is trending up +5% this week.</span>
          </div>
        </div>

      </header>

      <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-8 scroll-smooth pb-20 hide-scrollbar">
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Metabolic Impact Card */}
          <div className="xl:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 transition-opacity pointer-events-none">
              <span className="material-symbols-outlined text-8xl text-slate-900 dark:text-white">hub</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              Metabolic Impact
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 font-medium border border-slate-200 dark:border-white/10">Live</span>
            </h3>

            <div className="flex flex-col gap-8">
              {/* Macro Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <div className="bg-white dark:bg-black/20 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-card border border-slate-100 dark:border-white/5 hover:shadow-soft transition-all hover:-translate-y-1 h-36">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest">Protein</span>
                    <span className="material-symbols-outlined text-orange-500 text-xl filled">fitness_center</span>
                  </div>
                  <div className="mt-auto">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">24<span className="text-base font-semibold ml-0.5">g</span></span>
                    <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-1.5 mt-3">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-black/20 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-card border border-slate-100 dark:border-white/5 hover:shadow-soft transition-all hover:-translate-y-1 h-36">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest">Carbs</span>
                    <span className="material-symbols-outlined text-yellow-400 text-xl filled">grain</span>
                  </div>
                  <div className="mt-auto">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">45<span className="text-base font-semibold ml-0.5">g</span></span>
                    <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-1.5 mt-3">
                      <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-black/20 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-card border border-slate-100 dark:border-white/5 hover:shadow-soft transition-all hover:-translate-y-1 h-36">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest">Fats</span>
                    <span className="material-symbols-outlined text-orange-600 text-xl filled">water_drop</span>
                  </div>
                  <div className="mt-auto">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">12<span className="text-base font-semibold ml-0.5">g</span></span>
                    <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-1.5 mt-3">
                      <div className="bg-orange-600 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 dark:bg-primary/20 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-card border border-slate-800 dark:border-primary/30 hover:shadow-soft transition-all hover:-translate-y-1 h-36">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/70 uppercase tracking-widest">Energy</span>
                    <span className="material-symbols-outlined text-white text-xl">bolt</span>
                  </div>
                  <div className="mt-auto">
                    <span className="text-3xl font-black text-white tracking-tight">380<span className="text-base font-semibold ml-1">kcal</span></span>
                    <div className="w-full bg-slate-700 dark:bg-white/20 rounded-full h-1.5 mt-3">
                      <div className="bg-white h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Footer Row */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100 dark:border-white/5 mt-2">
                <div className="flex flex-col sm:flex-row gap-8 w-full lg:w-auto">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="size-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                      <div className="absolute inset-0 size-3 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">85</span>
                        <p className="text-sm font-bold text-slate-700 dark:text-white/80">Metabolic Score</p>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-white/40">Insulin Sensitivity Optimized</p>
                    </div>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-white/10"></div>
                  <div className="flex items-center gap-4">
                    <div className="size-3 rounded-full bg-slate-200 dark:bg-white/10"></div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">92</span>
                        <p className="text-sm font-bold text-slate-700 dark:text-white/80">Recovery Index</p>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-white/40">HRV is stable</p>
                    </div>
                  </div>
                </div>
                <button className="w-full lg:w-auto px-6 py-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-900 dark:text-white transition-all flex items-center justify-center gap-2 group whitespace-nowrap">
                  View Full Analysis
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 size-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <p className="text-slate-500 dark:text-white/50 text-sm font-medium mb-1">Glucose Stability</p>
                  <h4 className="text-3xl font-bold text-slate-900 dark:text-white">98 <span className="text-sm font-normal text-slate-400">mg/dL</span></h4>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="material-symbols-outlined">water_drop</span>
                </div>
              </div>
              <div className="w-full h-12 flex items-end gap-1 mb-2">
                <div className="w-1/6 h-[40%] bg-emerald-100 dark:bg-emerald-500/10 rounded-t-sm"></div>
                <div className="w-1/6 h-[60%] bg-emerald-100 dark:bg-emerald-500/10 rounded-t-sm"></div>
                <div className="w-1/6 h-[50%] bg-emerald-100 dark:bg-emerald-500/10 rounded-t-sm"></div>
                <div className="w-1/6 h-[80%] bg-emerald-500 rounded-t-sm"></div>
                <div className="w-1/6 h-[70%] bg-emerald-100 dark:bg-emerald-500/10 rounded-t-sm"></div>
                <div className="w-1/6 h-[55%] bg-emerald-100 dark:bg-emerald-500/10 rounded-t-sm"></div>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span> Stable within target range
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <p className="text-slate-500 dark:text-white/50 text-sm font-medium mb-1">Sleep Consistency</p>
                  <h4 className="text-3xl font-bold text-slate-900 dark:text-white">7h 42m</h4>
                </div>
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  <span className="material-symbols-outlined">bedtime</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-white/40 font-medium">
                +2% improvement from last week
              </p>
            </div>
          </div>
        </section>

        {/* Smart Snacking Horizontal Section */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-end px-1">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Smart Snacking</h3>
              <p className="text-slate-500 dark:text-white/50 text-sm mt-1">Bio-active compounds recommended for your current state.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="size-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
              </button>
              <button onClick={() => scroll('right')} className="size-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
          <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-4 -mx-2 px-2 snap-x hide-scrollbar">
            {[
              { title: "Raw Walnuts", desc: "Rich in ALA Omega-3s to optimize working memory.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRH3O_FZhxHsSMQpQMThkqhJq4qLGNTc6KxbY_Ipjc78DE-LlBO2pLae8tA-RwM4C1Z1wzYAXTC4OwhDzpk5N8lDU62oahimydbHPKWR8UGZrRL96fhhi7fCyit5t9pMyZAMV-Ck9gKpG3quHKY3pfmwJtrzpLl6258Olz2Zwm_fXEuTPEnuqKwqp67q0kQfrMkX0Qln7y21sbZcROdLxpJYNDXmoQXgWmafeUQTg7CHejxClNk-bW2N7ZvUENr_apdp6hx4nkKJ5o", tag: "Cognitive" },
              { title: "Matcha Latte", desc: "L-Theanine content promotes sustained alpha waves.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_51BkJgyCBRi0CrS-RJq1UDl3Y2Pq56L__rMaWsXXMPUe-6dwkIicxHf7_H5gZiSIcSdCiqKPZMeaPgBm5b96qhwcKn-4ei5WLsCB0f-aFvmUIqWZNLBW5mZyvZP7gtW5LkS4gR0k0E5bkY09wdp8hpeYNAlCg_fn6LNZFFlre0LtFVe1hUPI1LksF8C663JsJIUsyTXdkGQENzHnzpkhapgToe_6NYhKWPrgOXWer6R2WV8pDWK6SF24kg_3lZdXIK7OWhEFpKO_", tag: "Focus" },
              { title: "Wild Blueberries", desc: "Anthocyanins to support cerebral blood flow.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-RojPKJQpJLJ9WV-H7zeCyPzTr5y5ZUVYQJ3KhDBy-BiLvmrYAqjZYwFEF0ZK0G8aY3v8sFB0Era8T4o23zx-oLFb4hX3NbkgoEyH18wKkOTqP7pT_s0UjQt53HBQe5GtKzxzH3R85TRHr2-AmK3GvbdfzqSZnXroTIfjlPhLhgh5Kg-tUCwWVXLlpt5LMMULXoR1tEJT2M6mY_lYGj4J3FzMWiS1jJ7dRS3LNWKU5_iXhaX8-JtHUVOdVV-7l-vgSxPjHzWK9C4o", tag: "Antioxidant" }
            ].map((item, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[320px] glass-card rounded-2xl p-4 snap-center flex flex-col gap-4 group hover:border-primary/50 transition-all">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${item.img})` }}></div>
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase tracking-wider shadow-sm">{item.tag}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-500 dark:text-white/60 text-sm">{item.desc}</p>
                </div>
                <button className="mt-auto w-full py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary hover:text-white text-slate-900 dark:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 group/btn">
                  <span className="material-symbols-outlined text-lg">add</span>
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Wellness Hub Section */}
        <section>
          <WellnessFinder />
        </section>

        {/* Clinical Insights Section */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Clinical Insights</h3>
            <a className="text-primary-dark dark:text-primary text-sm font-semibold hover:underline" href="#">View Library</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer group bg-white dark:bg-surface-dark/40">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary-dark text-xl">science</span>
                  <span className="text-xs font-bold text-primary-dark uppercase tracking-wide">New Study</span>
                </div>
                <span className="text-slate-300 dark:text-white/30 group-hover:text-slate-500 dark:group-hover:text-white transition-colors material-symbols-outlined">expand_more</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">Polyphenols & Neuroplasticity</h4>
              <p className="text-slate-500 dark:text-white/60 text-sm mb-4 line-clamp-2">Recent data suggests that polyphenol-rich diets can significantly enhance BDNF levels in the hippocampus, improving learning speed.</p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">article</span>
                <span>Wu et al. 2025, Journal of Neuroscience</span>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer group bg-white dark:bg-surface-dark/40">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-indigo-500 text-xl">history_edu</span>
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide">Historical Data</span>
                </div>
                <span className="text-slate-300 dark:text-white/30 group-hover:text-slate-500 dark:group-hover:text-white transition-colors material-symbols-outlined">expand_more</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">Timing of Glucose Intake</h4>
              <p className="text-slate-500 dark:text-white/60 text-sm mb-4 line-clamp-2">Consuming complex carbohydrates 2 hours prior to deep work sessions correlates with a 15% reduction in cognitive fatigue.</p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">article</span>
                <span>Chen & Smith 2024, Metabolic Health Review</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
