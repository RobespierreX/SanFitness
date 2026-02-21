
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const [currentReview, setCurrentReview] = useState(0);

    const testimonials = [
        {
            quote: "SanFitness ha elevado el estándar del meal delivery. Es la primera vez que encuentro comida gourmet que realmente optimiza mis biomarcadores.",
            name: "Alejandro Sanz",
            title: "Atleta Pro & Gastrónomo",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIR57JhrnkOWsg-Bu6qHhUr9r0lshp6MWHML7fBvjV-1S6v8Hkazn-m5fYTFxsxhMvOF1wqFq1VPNgFpnNx__TsPiugKIcUeP_MQYT2H1KKNj58fTDALzenAPJ5en3UzFRlh8KPfMLHukxInHxnojdsKSk7JK8YKdOkunm1HGAwqLj_8Qri43bG_CdWEYoP47SiKw0QGe64ZHUxG2P4BF0akl04GKoCAsbwrfteEScgMVjKXqbesumsw_s4BDgUqXfrxdDoL1NGiEO"
        },
        {
            quote: "Mis clientes han visto cambios radicales en su rendimiento gracias a la precisión nutricional y el exquisito sabor de los platos.",
            name: "Valeria Rossi",
            title: "Entrenadora Personal",
            img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            quote: "La personalización es de otro nivel. Nunca me había sentido con tanta energía sosteniendo mis entrenamientos de fondo.",
            name: "Martín Herrera",
            title: "Maratonista",
            img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            quote: "Amo los snacks pro-performance. Me salvan entre clases sin causar picos de insulina y me mantienen enfocada y ligera.",
            name: "Sofia Mendoza",
            title: "Yoga Instructor",
            img: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            quote: "La comunidad, los tips, y el menú de SanFitness me ahorran horas de Meal Prep. Resultados visibles semana a semana.",
            name: "David Torres",
            title: "Crossfitter Competitivo",
            img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
    ];

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % testimonials.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    return (
        <div className="font-[Space_Grotesk,sans-serif] bg-[#f6f8f7] dark:bg-[#102217] text-[#111814] dark:text-white antialiased">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#102217]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full border border-slate-100 dark:border-white/10 shadow-sm overflow-hidden flex items-center justify-center bg-white">
                            <img src="/logo.png" alt="SanFitness Logo" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">SanFitness</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-medium hover:text-[#2bee79] transition-colors" href="#platos" onClick={(e) => { e.preventDefault(); document.getElementById('platos')?.scrollIntoView({ behavior: 'smooth' }); }}>Menú Semanal</a>
                        <a className="text-sm font-medium hover:text-[#2bee79] transition-colors" href="#snacks" onClick={(e) => { e.preventDefault(); document.getElementById('snacks')?.scrollIntoView({ behavior: 'smooth' }); }}>Snacks Funcionales</a>
                        <a className="text-sm font-medium hover:text-[#2bee79] transition-colors" href="#suscripcion" onClick={(e) => { e.preventDefault(); document.getElementById('suscripcion')?.scrollIntoView({ behavior: 'smooth' }); }}>Suscripción</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-bold px-4 py-2 hover:opacity-70 transition-opacity">
                            Acceder
                        </Link>
                        <Link to="/login" className="bg-[#2bee79] text-[#111814] px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight hover:brightness-105 transition-all">
                            Pedir Ahora
                        </Link>
                    </div>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-8 order-2 lg:order-1">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter">
                                Nutrición que <span className="text-[#2bee79] underline decoration-[#111814]/10 underline-offset-8">Potencia</span> tu Rendimiento.
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-xl">
                                Premium meal delivery y snacks funcionales diseñados para atletas y profesionales de alto nivel. Comida real, personalizada y directa a tu puerta.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/login" className="bg-[#2bee79] text-[#111814] h-14 px-10 rounded-xl text-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl shadow-[#2bee79]/20 flex items-center justify-center">
                                Ver Menú
                            </Link>
                            <button onClick={() => document.getElementById('snacks')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-[#111814]/10 dark:border-white/10 h-14 px-10 rounded-xl text-lg font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                Snacks Protein
                            </button>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-square bg-gray-200 shadow-2xl">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700" style={{ backgroundImage: "url('/food_packaging.jpg')" }}>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="menu" className="bg-white dark:bg-[#102217]/50 pt-24 pb-16 border-y border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Nuestra Propuesta Gastronómica</h2>
                        <p className="text-gray-500 max-w-2xl">Fusionamos la alta cocina con la precisión nutricional para que cada bocado cuente en tu evolución.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-[#f6f8f7] dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col gap-6 group hover:border-[#2bee79]/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-[#2bee79]/10 flex items-center justify-center text-[#2bee79]">
                                <span className="material-symbols-outlined !text-3xl">restaurant_menu</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">Comida Real, Resultados Reales</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Platos gourmet preparados con ingredientes frescos y orgánicos. Sin ultraprocesados, solo nutrición pura y sabor excepcional.</p>
                            </div>
                        </div>
                        <div className="p-8 rounded-2xl bg-[#f6f8f7] dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col gap-6 group hover:border-[#2bee79]/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-[#2bee79]/10 flex items-center justify-center text-[#2bee79]">
                                <span className="material-symbols-outlined !text-3xl">bolt</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">Snacks Pro-Performance</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Barritas proteicas y nootrópicos naturales diseñados para mantener tu energía y enfoque cognitivo durante todo el día.</p>
                            </div>
                        </div>
                        <div className="p-8 rounded-2xl bg-[#f6f8f7] dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col gap-6 group hover:border-[#2bee79]/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-[#2bee79]/10 flex items-center justify-center text-[#2bee79]">
                                <span className="material-symbols-outlined !text-3xl">fingerprint</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">Personalización Clínica</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Adaptamos tus platos a tus datos biométricos. Cada gramo de proteína y carbohidrato está ajustado a tu metabolismo único.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery of Menu Dishes */}
            <section id="platos" className="bg-[#f6f8f7] dark:bg-[#102217]/80 py-20 border-b border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Catálogo de Platos</h2>
                            <p className="text-gray-500 max-w-xl">Descubre la variedad de platos frescos, orgánicos y perfectamente balanceados creados por nuestros chefs.</p>
                        </div>
                        <Link to="/login" className="text-[#2bee79] font-bold hover:opacity-80 flex items-center gap-2 group transition-all">
                            Ver catálogo completo
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover-group">
                        {[
                            { name: 'Pollo Teriyaki Keto', tag: 'Bajo en Carbos', img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800' },
                            { name: 'Bowl de Salmón Pacífico', tag: 'Omega-3', img: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800' },
                            { name: 'Avena Energética Fresca', tag: 'Desayuno', img: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800' },
                            { name: 'Filete Mignon Fit', tag: 'Alto en Proteína', img: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=800' },
                        ].map((dish, i) => (
                            <Link to="/login" key={i} className="group cursor-pointer">
                                <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-white/10">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${dish.img}")` }}></div>
                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                        {dish.tag}
                                    </div>
                                </div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#2bee79] transition-colors">{dish.name}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery of Functional Snacks */}
            <section id="snacks" className="bg-white dark:bg-[#102217] py-20 border-b border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Snacks de Alto Rendimiento</h2>
                            <p className="text-gray-500 max-w-xl">Desde barras proteicas y nootrópicos hasta super-foods de asimilación rápida para mantener tu energía a tope.</p>
                        </div>
                        <Link to="/login" className="text-[#2bee79] font-bold hover:opacity-80 flex items-center gap-2 group transition-all">
                            Ver línea completa
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover-group">
                        {[
                            { name: 'Mix Almendras & Nueces', tag: 'Grasas Saludables', img: 'https://images.pexels.com/photos/128865/pexels-photo-128865.jpeg?auto=compress&cs=tinysrgb&w=800' },
                            { name: 'Barrita Cacao 70% Proteica', tag: 'Nootrópico', img: 'https://images.pexels.com/photos/7642000/pexels-photo-7642000.jpeg?auto=compress&cs=tinysrgb&w=800' },
                            { name: 'Smoothie Verde Antioxidante', tag: 'Recovery', img: 'https://images.pexels.com/photos/1346215/pexels-photo-1346215.jpeg?auto=compress&cs=tinysrgb&w=800' },
                            { name: 'Energy Bites Dátiles', tag: 'Energía Rápida', img: 'https://images.pexels.com/photos/693794/pexels-photo-693794.jpeg?auto=compress&cs=tinysrgb&w=800' },
                        ].map((snack, i) => (
                            <Link to="/login" key={i} className="group cursor-pointer">
                                <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-white/10">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${snack.img}")` }}></div>
                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                        {snack.tag}
                                    </div>
                                </div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#2bee79] transition-colors">{snack.name}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[#f6f8f7] dark:bg-[#102217]">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale mb-20">
                        <div className="text-xl font-bold tracking-widest uppercase">Michelin Guide</div>
                        <div className="text-xl font-bold tracking-widest uppercase">Gourmet Tech</div>
                        <div className="text-xl font-bold tracking-widest uppercase">BioCatering</div>
                        <div className="text-xl font-bold tracking-widest uppercase">HighEnd Food</div>
                    </div>
                    <div className="max-w-4xl mx-auto text-center relative overflow-hidden px-8">
                        <button onClick={prevReview} className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#111814] border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md hover:text-[#2bee79] hover:scale-105 transition-all z-10">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>

                        <div className="mb-8">
                            <span className="material-symbols-outlined !text-5xl text-[#2bee79]/40">format_quote</span>
                        </div>

                        <div className="min-h-[160px] flex items-center justify-center relative">
                            {testimonials.map((testimonio, index) => (
                                <div key={index} className={`absolute w-full transition-all duration-500 transform ${index === currentReview ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-8'}`}>
                                    <p className="text-2xl lg:text-3xl font-medium leading-relaxed italic mb-8 px-4 lg:px-12">
                                        "{testimonio.quote}"
                                    </p>
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden shadow-sm">
                                            <img alt={testimonio.name} className="w-full h-full object-cover" src={testimonio.img} />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-lg">{testimonio.name}</div>
                                            <div className="text-sm text-[#2bee79] font-medium uppercase tracking-widest">{testimonio.title}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={nextReview} className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#111814] border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md hover:text-[#2bee79] hover:scale-105 transition-all z-10">
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>

                        {/* Dots Indicators */}
                        <div className="flex justify-center items-center gap-2 mt-12">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentReview(index)}
                                    className={`h-2.5 rounded-full transition-all ${index === currentReview ? 'w-8 bg-[#2bee79]' : 'w-2.5 bg-gray-300 dark:bg-white/20'}`}
                                    aria-label={`Ir al testimonio ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white dark:bg-[#102217]/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-4xl font-bold tracking-tight">Tu Impacto Metabólico</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Nuestras comidas SanFitness están meticulosamente diseñadas para alcanzar tus objetivos nutricionales con precisión milimétrica, eliminando las conjeturas de tu dieta diaria.
                            </p>
                            <ul className="flex flex-col gap-4 mt-4">
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#2bee79]">check_circle</span>
                                    <span>Ajuste dinámico según tu gasto calórico real.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#2bee79]">check_circle</span>
                                    <span>Control glucémico en cada snack y comida.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="grid gap-4">
                            <div className="flex items-center gap-6 rounded-2xl border border-[#111814]/5 dark:border-white/5 bg-[#f6f8f7] dark:bg-white/5 p-6 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-xl bg-white dark:bg-[#111814] flex items-center justify-center text-[#2bee79] shadow-sm">
                                    <span className="material-symbols-outlined !text-3xl">egg</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className="font-bold text-lg">Proteína</h4>
                                        <span className="text-sm font-medium text-gray-500">120g / 150g</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-[#2bee79] h-full rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 rounded-2xl border border-[#111814]/5 dark:border-white/5 bg-[#f6f8f7] dark:bg-white/5 p-6 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-xl bg-white dark:bg-[#111814] flex items-center justify-center text-[#2bee79] shadow-sm">
                                    <span className="material-symbols-outlined !text-3xl">eco</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className="font-bold text-lg">Carbohidratos</h4>
                                        <span className="text-sm font-medium text-gray-500">200g / 250g</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-[#2bee79] h-full rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 rounded-2xl border border-[#111814]/5 dark:border-white/5 bg-[#f6f8f7] dark:bg-white/5 p-6 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-xl bg-white dark:bg-[#111814] flex items-center justify-center text-[#2bee79] shadow-sm">
                                    <span className="material-symbols-outlined !text-3xl">water_drop</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className="font-bold text-lg">Grasas</h4>
                                        <span className="text-sm font-medium text-gray-500">60g / 80g</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-[#2bee79] h-full rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Suscripciones / Membresías */}
            <section id="suscripcion" className="py-24 bg-[#f6f8f7] dark:bg-[#102217]/50 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Únete a la Élite</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Elige el plan que mejor se adapte a tu metabolismo y metas rindiendo al 100% todos los días.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Plan Básico */}
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 flex flex-col hover:border-[#2bee79]/30 transition-colors shadow-sm relative">
                            <h3 className="text-xl font-bold mb-2">Comunidad</h3>
                            <p className="text-gray-500 text-sm mb-6">Para quienes buscan empezar su camino saludable.</p>
                            <div className="mb-8">
                                <span className="text-4xl font-black">Gratis</span>
                            </div>
                            <ul className="flex flex-col gap-4 mb-8 flex-1">
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span>Acceso completo a la <strong>Comunidad</strong> foros y discusiones.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span>Visualización de <strong>Recetas</strong> base.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-400">
                                    <span className="material-symbols-outlined text-gray-300 dark:text-gray-700 text-base">close</span>
                                    <span>Acceso a rutinas de ejercicios.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-400">
                                    <span className="material-symbols-outlined text-gray-300 dark:text-gray-700 text-base">close</span>
                                    <span>IA Chef y Generador Metabólico.</span>
                                </li>
                            </ul>
                            <Link to="/login" className="w-full py-4 rounded-xl font-bold bg-[#f6f8f7] dark:bg-white/5 text-[#111814] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-center">
                                Comenzar Gratis
                            </Link>
                        </div>

                        {/* Plan Pro (Destacado) */}
                        <div className="bg-[#111814] rounded-3xl p-8 border border-[#2bee79]/30 flex flex-col shadow-2xl shadow-[#2bee79]/10 relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2bee79] text-[#111814] text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full">
                                Más Popular
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Performance</h3>
                            <p className="text-gray-400 text-sm mb-6">El balance perfecto entre nutrición y rendimiento.</p>
                            <div className="mb-8 text-white">
                                <span className="text-4xl font-black">S/ 29</span>
                                <span className="text-gray-400">/mes</span>
                            </div>
                            <ul className="flex flex-col gap-4 mb-8 flex-1 text-white">
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span>Acceso <strong>Comunidad VIP</strong>.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span>Todas las <strong>Recetas Saludables</strong>.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span>Desbloqueo de <strong>todos los Ejercicios</strong>.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-400">
                                    <span className="material-symbols-outlined text-gray-600 text-base">close</span>
                                    <span>IA Chef e integración directa.</span>
                                </li>
                            </ul>
                            <Link to="/login" className="w-full py-4 rounded-xl font-bold bg-[#2bee79] text-[#111814] hover:brightness-110 shadow-lg shadow-[#2bee79]/20 transition-all text-center">
                                Probar 7 Días
                            </Link>
                        </div>

                        {/* Plan Elite */}
                        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 flex flex-col hover:border-[#2bee79]/30 transition-colors shadow-sm relative">
                            <h3 className="text-xl font-bold mb-2">Biomarkers Elite</h3>
                            <p className="text-gray-500 text-sm mb-6">La experiencia completa para atletas exigentes.</p>
                            <div className="mb-8">
                                <span className="text-4xl font-black">S/ 39</span>
                                <span className="text-gray-500">/mes</span>
                            </div>
                            <ul className="flex flex-col gap-4 mb-8 flex-1">
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span>Incluye todo el plan <strong>Performance</strong>.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span><strong>Chef de Inteligencia Artificial</strong> ilimitado.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span>Descuento de 20% en Snacks Funcionales.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[#2bee79] text-base">check</span>
                                    <span>Envíos prioritarios de Meal Delivery.</span>
                                </li>
                            </ul>
                            <Link to="/login" className="w-full py-4 rounded-xl font-bold bg-[#f6f8f7] dark:bg-white/5 text-[#111814] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-center">
                                Obtener Elite
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-[#111814] text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid md:grid-cols-4 gap-12 mb-20">
                        <div className="flex flex-col gap-6 col-span-1 md:col-span-1">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full border border-white/10 shadow-sm overflow-hidden flex items-center justify-center bg-white">
                                    <img src="/logo.png" alt="SanFitness Logo" className="w-full h-full object-contain" />
                                </div>
                                <h2 className="text-lg font-bold">SanFitness</h2>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Redefiniendo el meal delivery a través de la ciencia y la gastronomía de alto rendimiento. Nutrición sin compromisos.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-2">Gastronomía</h4>
                            <a className="text-gray-400 hover:text-[#2bee79] text-sm transition-colors" href="#">Menú Semanal</a>
                            <a className="text-gray-400 hover:text-[#2bee79] text-sm transition-colors" href="#">Snacks Bio-Tech</a>
                            <a className="text-gray-400 hover:text-[#2bee79] text-sm transition-colors" href="#">Ingredientes</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-2">Soporte</h4>
                            <a className="text-gray-400 hover:text-[#2bee79] text-sm transition-colors" href="#">Sobre Nosotros</a>
                            <a className="text-gray-400 hover:text-[#2bee79] text-sm transition-colors" href="#">Envíos</a>
                            <a className="text-gray-400 hover:text-[#2bee79] text-sm transition-colors" href="#">FAQ</a>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-2">Únete a la Élite</h4>
                            <div className="flex flex-col gap-3">
                                <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#2bee79]" placeholder="Tu email" type="email" />
                                <button className="bg-[#2bee79] text-[#111814] rounded-lg py-2.5 text-sm font-bold">Suscribirse</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-gray-500 text-xs">
                        <p>© 2024 SanFitness Food Technologies Inc. Todos los derechos reservados.</p>
                        <div className="flex gap-8">
                            <a className="hover:text-white transition-colors" href="#">Privacidad</a>
                            <a className="hover:text-white transition-colors" href="#">Términos</a>
                            <a className="hover:text-white transition-colors" href="#">Nutrición</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default LandingPage;
