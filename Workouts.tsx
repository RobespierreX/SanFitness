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
  category: string;
}

const workouts: WorkoutCard[] = [
  {
    id: '1',
    title: 'Full Body Power',
    description: 'Optimización de ATP y Resiliencia muscular a través de movimientos compuestos.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    duration: '45 Min',
    level: 'Intermedio',
    tag: 'Intenso',
    tagColor: 'text-orange-500',
    icon: 'local_fire_department',
    category: 'Fuerza'
  },
  {
    id: '2',
    title: 'Metabolic Blast',
    description: 'Acondicionamiento cardiovascular de alta intensidad para máxima quema calórica.',
    image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '30 Min',
    level: 'Avanzado',
    tag: 'Cardio',
    tagColor: 'text-red-500',
    icon: 'ecg_heart',
    category: 'Cardio'
  },
  {
    id: '3',
    title: 'Movilidad & Recovery',
    description: 'Sesión regenerativa enfocada en la movilidad articular y reducción de cortisol.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    duration: '25 Min',
    level: 'Principiante',
    tag: 'Flow',
    tagColor: 'text-blue-500',
    icon: 'self_improvement',
    category: 'Flexibilidad'
  },
  {
    id: '4',
    title: 'Upper Body Build',
    description: 'Enfoque estructural para el desarrollo de pectorales, deltoides y dorsales.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    duration: '50 Min',
    level: 'Intermedio',
    tag: 'Upper',
    tagColor: 'text-purple-500',
    icon: 'fitness_center',
    category: 'Hipertrofia'
  },
  {
    id: '5',
    title: 'Leg Day Destruction',
    description: 'Entrenamiento de alto volumen para cuádriceps, isquios y glúteos.',
    image: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?auto=format&fit=crop&w=800&q=80',
    duration: '60 Min',
    level: 'Avanzado',
    tag: 'Pierna',
    tagColor: 'text-emerald-500',
    icon: 'hardware',
    category: 'Hipertrofia'
  },
  {
    id: '6',
    title: 'Core Crusher',
    description: 'Rutina rápida y explosiva para fortalecer el núcleo y mejorar la estabilidad.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    duration: '15 Min',
    level: 'Todo nivel',
    tag: 'Core',
    tagColor: 'text-teal-500',
    icon: 'bolt',
    category: 'Fuerza'
  },
  {
    id: '7',
    title: 'Push Day Extremo',
    description: 'Trabajo intenso de empuje para desarrollar pecho, hombros y tríceps.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    duration: '55 Min',
    level: 'Avanzado',
    tag: 'Empuje',
    tagColor: 'text-rose-500',
    icon: 'fitness_center',
    category: 'Hipertrofia'
  },
  {
    id: '8',
    title: 'Espalda de Acero',
    description: 'Rutina de tracción pesada para conseguir una espalda ancha y densa.',
    image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=800&q=80',
    duration: '50 Min',
    level: 'Intermedio',
    tag: 'Tracción',
    tagColor: 'text-indigo-500',
    icon: 'accessibility_new',
    category: 'Hipertrofia'
  },
  {
    id: '9',
    title: 'HIIT Fat Burner',
    description: 'Intervalos cortos e intensos diseñados para acelerar el metabolismo en minutos.',
    image: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '20 Min',
    level: 'Todo nivel',
    tag: 'HIIT',
    tagColor: 'text-red-500',
    icon: 'timer',
    category: 'Cardio'
  },
  {
    id: '10',
    title: 'Flexibilidad Dinámica',
    description: 'Estiramientos dinámicos para preparar los músculos y evitar lesiones.',
    image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '15 Min',
    level: 'Principiante',
    tag: 'Prevención',
    tagColor: 'text-sky-500',
    icon: 'accessibility',
    category: 'Flexibilidad'
  },
  {
    id: '12',
    title: 'Yoga para Dormir',
    description: 'Posturas de yoga relajantes para calmar la mente antes de acostarse.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    duration: '30 Min',
    level: 'Principiante',
    tag: 'Relax',
    tagColor: 'text-indigo-300',
    icon: 'bedtime',
    category: 'Flexibilidad'
  },
  {
    id: '13',
    title: 'Fuerza Base 5x5',
    description: 'El clásico programa de fuerza enfocado en los grandes levantamiento.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    duration: '60 Min',
    level: 'Intermedio',
    tag: 'Power',
    tagColor: 'text-amber-600',
    icon: 'fitness_center',
    category: 'Fuerza'
  },
  {
    id: '14',
    title: 'Glúteos de Hierro',
    description: 'Aislamiento e hipertrofia enfocada 100% en el desarrollo de glúteos.',
    image: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?auto=format&fit=crop&w=800&q=80',
    duration: '40 Min',
    level: 'Todo nivel',
    tag: 'Glúteo',
    tagColor: 'text-pink-500',
    icon: 'sports_martial_arts',
    category: 'Hipertrofia'
  },
  {
    id: '15',
    title: 'Boxing Cardio',
    description: 'Combinaciones de boxeo al aire libre para sudar a chorros.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    duration: '35 Min',
    level: 'Intermedio',
    tag: 'Boxeo',
    tagColor: 'text-red-600',
    icon: 'sports_mma',
    category: 'Cardio'
  },
  {
    id: '16',
    title: 'Dominadas Perfectas',
    description: 'Progresiones de calistenia para conseguir tu primera dominada o sumar repeticiones.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
    duration: '30 Min',
    level: 'Principiante',
    tag: 'Pull',
    tagColor: 'text-blue-600',
    icon: 'arrow_upward',
    category: 'Calistenia'
  },
  {
    id: '17',
    title: 'CrossFit: Fran',
    description: 'El famoso y temido WOD Fran de CrossFit. 21-15-9 de Thrusters y Dominadas.',
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&w=800&q=80',
    duration: '10 Min',
    level: 'Profesional',
    tag: 'Benchmark',
    tagColor: 'text-gray-900 dark:text-gray-200',
    icon: 'timer',
    category: 'Crossfit'
  },
  {
    id: '18',
    title: 'Calistenia Core',
    description: 'Front levers, L-sits y banderas para una zona media de acero.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
    duration: '45 Min',
    level: 'Avanzado',
    tag: 'Abs',
    tagColor: 'text-teal-600',
    icon: 'accessibility_new',
    category: 'Calistenia'
  },
  {
    id: '20',
    title: 'Endurance 10K',
    description: 'Sesión de carrera de fondo para mejorar tu resistencia aeróbica.',
    image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=800&q=80',
    duration: '60 Min',
    level: 'Intermedio',
    tag: 'Running',
    tagColor: 'text-green-500',
    icon: 'directions_run',
    category: 'Cardio'
  },
  {
    id: '21',
    title: 'Pilates Reformer',
    description: 'Secuencia clásica de pilates adaptada para hacer en tu propio mat.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    duration: '45 Min',
    level: 'Todo nivel',
    tag: 'Pilates',
    tagColor: 'text-fuchsia-500',
    icon: 'self_improvement',
    category: 'Flexibilidad'
  },
  {
    id: '22',
    title: 'Hombros 3D',
    description: 'Trabajo multiangular para desarrollar cabezas anterior, lateral y posterior del deltoides.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    duration: '45 Min',
    level: 'Intermedio',
    tag: 'Hombros',
    tagColor: 'text-indigo-400',
    icon: 'fitness_center',
    category: 'Hipertrofia'
  },
  {
    id: '24',
    title: 'WOD Murph Prep',
    description: 'Preparación específica para superar uno de los entrenamientos más duros del mundo.',
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&w=800&q=80',
    duration: '60 Min',
    level: 'Avanzado',
    tag: 'WOD',
    tagColor: 'text-slate-700',
    icon: 'military_tech',
    category: 'Crossfit'
  },
  {
    id: '25',
    title: 'Piernas Libres',
    description: 'Hipertrofia de tren inferior sin pesas. Solo con peso corporal.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
    duration: '30 Min',
    level: 'Principiante',
    tag: 'Pierna',
    tagColor: 'text-green-600',
    icon: 'directions_walk',
    category: 'Calistenia'
  },
  {
    id: '26',
    title: 'Yoga Power Vinyasa',
    description: 'Flujo dinámico y desafiante de Vinyasa que combina sudor, fuerza y flexibilidad.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    duration: '55 Min',
    level: 'Intermedio',
    tag: 'Vinyasa',
    tagColor: 'text-orange-400',
    icon: 'monitor_heart',
    category: 'Flexibilidad'
  },
  {
    id: '27',
    title: 'Cardio Kickboxing',
    description: 'Artes marciales mixtas al ritmo de la música para quemar hasta 600 kcal.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    duration: '45 Min',
    level: 'Intermedio',
    tag: 'Combate',
    tagColor: 'text-red-700',
    icon: 'sports_kabaddi',
    category: 'Cardio'
  },
  {
    id: '28',
    title: 'Levantamiento Olímpico',
    description: 'Técnica de Snatch y Clean & Jerk para potencia brutal.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    duration: '60 Min',
    level: 'Avanzado',
    tag: 'Oly',
    tagColor: 'text-blue-800',
    icon: 'fitness_center',
    category: 'Fuerza'
  },
  {
    id: '29',
    title: 'Recuperación Activa',
    description: 'Caminata ligera y rodillo de espuma (foam rolling) para domadas agujetas.',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '20 Min',
    level: 'Principiante',
    tag: 'Recovery',
    tagColor: 'text-emerald-400',
    icon: 'spa',
    category: 'Flexibilidad'
  },
  {
    id: '30',
    title: 'El Desafío de los 300',
    description: 'Circuito infernal de gimnasia y levantamiento basado en la película 300.',
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&w=800&q=80',
    duration: '40 Min',
    level: 'Extra Avanzado',
    tag: 'Desafío',
    tagColor: 'text-red-900',
    icon: 'local_fire_department',
    category: 'Crossfit'
  },
  {
    id: '31',
    title: 'Kettlebell Iron',
    description: 'Fuerza extrema usando únicamente pesas rusas de alto calibre.',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=800&q=80',
    duration: '45 Min',
    level: 'Intermedio',
    tag: 'Fuerza',
    tagColor: 'text-orange-600',
    icon: 'fitness_center',
    category: 'Fuerza'
  },
  {
    id: '32',
    title: 'Strongman Basics',
    description: 'Los movimientos básicos de strongman adaptados al gimnasio.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    duration: '50 Min',
    level: 'Avanzado',
    tag: 'Potencia',
    tagColor: 'text-red-800',
    icon: 'hardware',
    category: 'Fuerza'
  },
  {
    id: '33',
    title: 'Sprint Intervals',
    description: 'Secuencias de sprints en cinta para llevar tu VO2 max al límite.',
    image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=800&q=80',
    duration: '25 Min',
    level: 'Avanzado',
    tag: 'Sprint',
    tagColor: 'text-blue-500',
    icon: 'directions_run',
    category: 'Cardio'
  }
];

const Workouts: React.FC = () => {
  const [filter, setFilter] = useState('Todo');
  const filters = ['Todo', 'Fuerza', 'Cardio', 'Hipertrofia', 'Flexibilidad', 'Crossfit', 'Calistenia'];

  const filteredWorkouts = filter === 'Todo'
    ? workouts
    : workouts.filter(w => w.category === filter);

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
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex h-10 items-center justify-center px-6 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 ${filter === f
                ? 'bg-primary text-slate-900 shadow-primary/30'
                : 'bg-white dark:bg-white/5 text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-100 dark:border-white/10'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {filteredWorkouts.length === 0 ? (
            <div className="col-span-full py-10 text-center text-text-subtle dark:text-white/60 w-full text-lg">
              No hay entrenamientos para esta categoría aún.
            </div>
          ) : (
            filteredWorkouts.map((workout) => (
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
                  {/* Category Badge on top left for visibility */}
                  < div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase font-bold text-white shadow-sm border border-white/10" >
                    {workout.category}
                  </div>
                </div >
                <div className="flex flex-col flex-1 p-6 z-10">
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
                    <button className="flex h-9 px-5 items-center justify-center rounded-full bg-primary text-slate-900 text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                      Ver rutina
                    </button>
                  </div>
                </div>
              </article >
            ))
          )}
        </div >

        {/* Footer */}
        < footer className="mt-auto w-full border-t border-gray-100 dark:border-white/5 bg-white/50 dark:bg-transparent py-8 rounded-xl" >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-text-subtle dark:text-white/40 text-sm">© 2026 SanFitness Ecosystem. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="text-text-subtle dark:text-white/40 hover:text-primary transition-colors text-sm" href="#">Privacidad</a>
              <a className="text-text-subtle dark:text-white/40 hover:text-primary transition-colors text-sm" href="#">Términos</a>
              <a className="text-text-subtle dark:text-white/40 hover:text-primary transition-colors text-sm" href="#">Soporte</a>
            </div>
          </div>
        </footer >
      </main >
    </div >
  );
};

export default Workouts;
