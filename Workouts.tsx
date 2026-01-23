
import React, { useState } from 'react';

interface WorkoutCard {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  tag: string;
  tagColor: string;
  icon: string;
}

const workouts: WorkoutCard[] = [
  {
    id: '1',
    title: 'Full Body Power',
    description: 'Optimización de ATP y Resiliencia muscular a través de movimientos compuestos.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Jqy9bhMqwwOAJGzf5UkUD3UUOUL7BjFg1oW9WzjGawK7mRCp0JJIFhhU0Vtw7ub2SL7qqRlJMxGDO2Fuj9ZsYNMyclPSAKcRafYX3HU_WOi7clM5TMWUYFeEzhmbdGDR89aQZ3AzMoX5ACIv4-_lQCaZVhTPwI23kjMIn0WR3bXxPJxHndgEe1ap6SktT4OXOgkBYz9-ZFNn6cRTwBIuAVmpqkzBGGolUH6SDiyN69SGxBlp7CcnADYw781zLqtnrfGpmwD5kAvK',
    duration: '45 Min',
    level: 'Intermedio',
    tag: 'Intenso',
    tagColor: 'text-orange-500',
    icon: 'local_fire_department'
  },
  {
    id: '2',
    title: 'Metabolic Blast',
    description: 'Acondicionamiento cardiovascular de alta intensidad para máxima quema calórica.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsBuQKsxmgLvLn2c_UMDlq67gLFzs3Xnk5kZQzvd0TyOO7waGUhY4ICTU0rhRsz2pkFy5nCuKpUD7p0CSCSWYQlfB5QHcio3MU0En3aZ8FlzqLmM1QPHKRh_xRmiF3q4zZXx8OQklWOev6R1KUI_9BuGATAP0ThAKTL4JRE6zA_blC6AxVrQMTCT1DiNMCs9m6vLBCfqKksV4hVUM2_SeZwcf9tod64Ihbs7u5unCMs4G3NVlz3V8JXlLFusJnln8sv05h_hy_3Bp',
    duration: '30 Min',
    level: 'Avanzado',
    tag: 'Cardio',
    tagColor: 'text-red-500',
    icon: 'ecg_heart'
  },
  {
    id: '3',
    title: 'Movilidad & Recovery',
    description: 'Sesión regenerativa enfocada en la movilidad articular y reducción de cortisol.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD9AfEe6yS0iupwG9mxNW-6yUBI27TjLuxUaoPznfJCA-tPRO11TYt7vkDq8fxvMFOCrfk4E_4XQEY_k08exXGdx0_eDwsWaxFieHK-3pVax-Z7DXlWSLb9R5WXNeESeQmKlLy-yEMo5c93RicleH2xjP4wzJl7wL-Ffdnb-wEH_sc0IA65bszG5VirwNNpFIX_jtoLQklm-7GkSrzPkwWtPXP0PTLQoDxmJgjHwWAc--WNRRb2v8lzpSM-Aybzwjmjunjw_3aY-9G',
    duration: '25 Min',
    level: 'Principiante',
    tag: 'Flow',
    tagColor: 'text-blue-500',
    icon: 'self_improvement'
  },
  {
    id: '4',
    title: 'Upper Body Build',
    description: 'Enfoque estructural para el desarrollo de pectorales, deltoides y dorsales.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsZKidEN1TCZOZs1z_RuYBd8Th93irjtm2C8rIio_43KfjT5isZQ5ajqb0NxFor_rNMQvTcORY3l0Y4ef4Uz9enFnPT2zdUQ14qSIC1FvjTJ72mCzslFyby5gjndiiFcr4biOaonx0Z4ji8GqJdW4ZQuK65YKNfdoQiAeYwnLdGYK7CSWGpKBoYWPaaCljl6LJOtpgOvfvqNzTQbiBJG9QZhjOM7MxqRpL97W6dZ_ACTbksF5owYHukqqbT6QjRpiogeMFBsgBa7s5',
    duration: '50 Min',
    level: 'Intermedio',
    tag: 'Hipertrofia',
    tagColor: 'text-purple-500',
    icon: 'fitness_center'
  },
  {
    id: '5',
    title: 'Leg Day Destruction',
    description: 'Entrenamiento de alto volumen para cuádriceps, isquios y glúteos.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv4GK7_1ruQPs1dY-EEdNu-yYjKzSuhHI6Q269ZkZ_JFOBrSyHtC6z82oELeFDBApGtygL5fypavEXVxVGZ2PH403Jp8t0by3U2BBnscGrA5Zd7tQnYlofs65338qonJGjMO62HY7dzCPfsnkSs7_uOo4mX4_GEIMcDjJoiGj5-44DPg8vDJNujNgbWqsSnEmHB2H5SwoAJ4MbzQbpnyEnvtZqP_mIeiFGk5cbXfhbz4wPF3zRVy0COLErjm0VqtM5_aYWdm91hMrr',
    duration: '60 Min',
    level: 'Avanzado',
    tag: 'Pierna',
    tagColor: 'text-primary',
    icon: 'hardware'
  },
  {
    id: '6',
    title: 'Core Crusher',
    description: 'Rutina rápida y explosiva para fortalecer el núcleo y mejorar la estabilidad.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzIn9RJIQoJisnHzl7YWBDmlGbR6Akcpuby04VwE3JG5bHRPQldnZq43wQMYcJf94GDDEWpZ4Of6mPxwazFA8XiMeE_JjmJ0dlClI3jF3TNmJfSJlnzEE4TaVsegNT4G-Pq2iFv2GqRMEccBtmVjK6OnmZWlgw2Y3A_A5XDaeuBnCfSl1nnAYvVmgPW_m2k-yDOvtAubtZ_aSSRgiLH3MBxGy1gkCPTtuaqyQXMCl5wmEQ5sn_yZBWBifO0Di6AuohsEPw5C4oLkOR',
    duration: '15 Min',
    level: 'Todo nivel',
    tag: 'Core',
    tagColor: 'text-teal-500',
    icon: 'bolt'
  }
];

const Workouts: React.FC = () => {
  const [filter, setFilter] = useState('Todo');

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark transition-colors overflow-y-auto antialiased">
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-8 lg:py-12">
        {/* Page Heading */}
        <div className="flex flex-col gap-4 mb-10 max-w-3xl">
          <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            Biblioteca de Entrenamiento
          </h1>
          <p className="text-text-subtle dark:text-white/60 text-lg font-normal leading-relaxed max-w-2xl">
            Explora rutinas de alto rendimiento diseñadas científicamente para optimizar tu fisiología y rendimiento atlético.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {['Todo', 'Fuerza', 'Cardio', 'Hipertrofia', 'Flexibilidad'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex h-10 items-center justify-center px-6 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 ${
                filter === f
                  ? 'bg-primary text-text-main shadow-primary/30'
                  : 'bg-white dark:bg-white/5 text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-100 dark:border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {workouts.map((workout) => (
            <article key={workout.id} className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-[24px] shadow-sm hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/5 transition-all duration-300 border border-gray-100 dark:border-white/5 overflow-hidden h-full">
              <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-black/20 relative">
                <div 
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${workout.image})` }}
                ></div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-text-main dark:text-white flex items-center gap-1 shadow-sm">
                  <span className={`material-symbols-outlined text-[16px] ${workout.tagColor}`}>{workout.icon}</span>
                  {workout.tag}
                </div>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex flex-col gap-2 mb-4">
                  <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {workout.title}
                  </h3>
                  <p className="text-text-subtle dark:text-white/60 text-sm font-normal leading-relaxed line-clamp-2">
                    {workout.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-text-main dark:text-white text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                      {workout.duration}
                    </div>
                    <span className="text-text-subtle dark:text-white/40 text-xs">{workout.level}</span>
                  </div>
                  <button className="flex h-9 px-5 items-center justify-center rounded-full bg-primary text-text-main text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                    Ver rutina
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-auto w-full border-t border-gray-100 dark:border-white/5 bg-white/50 dark:bg-transparent py-8 rounded-xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-text-subtle dark:text-white/40 text-sm">© 2024 SanFitness Ecosystem. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="text-text-subtle dark:text-white/40 hover:text-primary transition-colors text-sm" href="#">Privacidad</a>
              <a className="text-text-subtle dark:text-white/40 hover:text-primary transition-colors text-sm" href="#">Términos</a>
              <a className="text-text-subtle dark:text-white/40 hover:text-primary transition-colors text-sm" href="#">Soporte</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Workouts;
