
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
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
                        <a className="text-sm font-medium hover:text-[#2bee79] transition-colors" href="#">Menú Semanal</a>
                        <a className="text-sm font-medium hover:text-[#2bee79] transition-colors" href="#">Snacks Funcionales</a>
                        <a className="text-sm font-medium hover:text-[#2bee79] transition-colors" href="#">Suscripción</a>
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
                            <button className="border-2 border-[#111814]/10 dark:border-white/10 h-14 px-10 rounded-xl text-lg font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
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

            <section className="bg-white dark:bg-[#102217]/50 py-24 border-y border-gray-100 dark:border-white/5">
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

            <section className="py-20 bg-[#f6f8f7] dark:bg-[#102217]">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale mb-20">
                        <div className="text-xl font-bold tracking-widest uppercase">Michelin Guide</div>
                        <div className="text-xl font-bold tracking-widest uppercase">Gourmet Tech</div>
                        <div className="text-xl font-bold tracking-widest uppercase">BioCatering</div>
                        <div className="text-xl font-bold tracking-widest uppercase">HighEnd Food</div>
                    </div>
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="mb-8">
                            <span className="material-symbols-outlined !text-5xl text-[#2bee79]/40">format_quote</span>
                        </div>
                        <p className="text-2xl lg:text-3xl font-medium leading-relaxed italic mb-8">
                            "SanFitness ha elevado el estándar del meal delivery. Es la primera vez que encuentro comida gourmet que realmente optimiza mis biomarcadores."
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                                <img alt="Chef Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIR57JhrnkOWsg-Bu6qHhUr9r0lshp6MWHML7fBvjV-1S6v8Hkazn-m5fYTFxsxhMvOF1wqFq1VPNgFpnNx__TsPiugKIcUeP_MQYT2H1KKNj58fTDALzenAPJ5en3UzFRlh8KPfMLHukxInHxnojdsKSk7JK8YKdOkunm1HGAwqLj_8Qri43bG_CdWEYoP47SiKw0QGe64ZHUxG2P4BF0akl04GKoCAsbwrfteEScgMVjKXqbesumsw_s4BDgUqXfrxdDoL1NGiEO" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold">Alejandro Sanz</div>
                                <div className="text-sm text-gray-500 uppercase tracking-widest">Atleta Pro & Gastrónomo</div>
                            </div>
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
        </div>
    );
};

export default LandingPage;
