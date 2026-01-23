
import React, { useState } from 'react';
import { generatePersonalizedMeal } from './services/geminiService';

interface Meal {
  id: string;
  name: string;
  desc: string;
  cal: number;
  macros: string;
  price: number;
  img: string;
  tag: string;
}

const expressMeals: Meal[] = [
  {
    id: 'e1',
    name: "Salmón con Quinoa",
    desc: "Salmón salvaje a la plancha con base de quinoa real y espárragos trigueros.",
    cal: 450,
    macros: "P: 35g | C: 30g | F: 18g",
    price: 18.50,
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    tag: "High Protein"
  },
  {
    id: 'e2',
    name: "Bowl de Pollo y Camote",
    desc: "Pechuga de pollo orgánica, camote asado, espinacas frescas y semillas de calabaza.",
    cal: 520,
    macros: "P: 42g | C: 45g | F: 12g",
    price: 14.90,
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    tag: "Clean Bulk"
  },
  {
    id: 'e3',
    name: "Ensalada Performance",
    desc: "Mix de verdes, aguacate, huevo poché, nueces y aderezo de limón y aceite de oliva.",
    cal: 380,
    macros: "P: 15g | C: 12g | F: 28g",
    price: 12.50,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    tag: "Keto Friendly"
  },
  {
    id: 'e4',
    name: "Avena Proteica Nocturna",
    desc: "Avena integral, proteína de suero, bayas silvestres y mantequilla de almendras.",
    cal: 410,
    macros: "P: 28g | C: 48g | F: 10g",
    price: 9.50,
    img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800",
    tag: "Recovery"
  },
  {
    id: 'e5',
    name: "Albóndigas de Pavo con Zoodles",
    desc: "Albóndigas de pavo caseras servidas sobre 'fideos' de calabacín con salsa marinara.",
    cal: 380,
    macros: "P: 30g | C: 10g | F: 15g",
    price: 13.50,
    img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800",
    tag: "Low Carb"
  },
  {
    id: 'e6',
    name: "Saltado de Tofu y Vegetales",
    desc: "Tofu firme marinado, brócoli, pimientos y champiñones al wok con salsa de soja baja en sodio.",
    cal: 320,
    macros: "P: 20g | C: 25g | F: 18g",
    price: 11.90,
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    tag: "Vegan"
  },
  {
    id: 'e7',
    name: "Wrap de Pollo y Aguacate",
    desc: "Tortilla integral rellena de pollo grillado, aguacate cremoso, lechuga y tomate.",
    cal: 450,
    macros: "P: 32g | C: 35g | F: 22g",
    price: 10.50,
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800",
    tag: "Balanced"
  },
  {
    id: 'e8',
    name: "Smoothie Verde Detox",
    desc: "Espinaca, manzana verde, pepino, jengibre y proteína de guisante.",
    cal: 250,
    macros: "P: 20g | C: 30g | F: 2g",
    price: 8.50,
    img: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800",
    tag: "Detox"
  },
  {
    id: 'e9',
    name: "Ensalada de Garbanzos Asados",
    desc: "Garbanzos crujientes, pepino, tomate cherry, queso feta y vinagreta balsámica.",
    cal: 350,
    macros: "P: 15g | C: 40g | F: 15g",
    price: 11.00,
    img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800",
    tag: "Vegetarian"
  },
  {
    id: 'e10',
    name: "Bacalao al Horno con Vegetales",
    desc: "Filete de bacalao fresco horneado con hierbas, acompañado de zanahorias y judías verdes al vapor.",
    cal: 300,
    macros: "P: 25g | C: 15g | F: 10g",
    price: 16.50,
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?auto=format&fit=crop&q=80&w=800",
    tag: "Lean Protein"
  },
  {
    id: 'e11',
    name: "Frittata de Vegetales",
    desc: "Tortilla al horno con espinacas, champiñones, pimientos y cebolla caramelizada.",
    cal: 280,
    macros: "P: 18g | C: 12g | F: 18g",
    price: 9.90,
    img: "https://images.unsplash.com/photo-1658428172937-23963c623912?auto=format&fit=crop&q=80&w=800",
    tag: "Breakfast"
  },
  {
    id: 'e12',
    name: "Parfait de Yogurt Griego",
    desc: "Capas de yogurt griego natural, granola casera sin azúcar y frutos rojos frescos.",
    cal: 320,
    macros: "P: 20g | C: 35g | F: 8g",
    price: 7.50,
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
    tag: "Snack"
  }
];

const ingredientsList = {
  proteinas: [
    { name: "Pollo", img: "https://images.unsplash.com/photo-1587593810167-a649254d4736?auto=format&fit=crop&q=80&w=200" },
    { name: "Huevos", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=200" },
    { name: "Salmón", img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=200" },
    { name: "Tofu", img: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&q=80&w=200" },
    { name: "Pavo", img: "https://images.unsplash.com/photo-1574672174777-b875ad2f7e6e?auto=format&fit=crop&q=80&w=200" },
    { name: "Atún", img: "https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&q=80&w=200" }
  ],
  vegetales: [
    { name: "Espinaca", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=200" },
    { name: "Brócoli", img: "https://images.unsplash.com/photo-1459411621453-7edd0c4b7cb3?auto=format&fit=crop&q=80&w=200" },
    { name: "Tomates", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=200" },
    { name: "Lechuga", img: "https://images.unsplash.com/photo-1622206151226-18ca2c958a2f?auto=format&fit=crop&q=80&w=200" },
    { name: "Aguacate", img: "https://images.unsplash.com/photo-1523049673856-428689691147?auto=format&fit=crop&q=80&w=200" },
    { name: "Espárragos", img: "https://images.unsplash.com/photo-1515585934-22b27a69ccff?auto=format&fit=crop&q=80&w=200" }
  ],
  carbohidratos: [
    { name: "Quinoa", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200" },
    { name: "Arroz Integral", img: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=200" },
    { name: "Camote", img: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&q=80&w=200" },
    { name: "Avena", img: "https://images.unsplash.com/photo-1517093725587-f01c809e51b5?auto=format&fit=crop&q=80&w=200" },
    { name: "Pasta Integral", img: "https://images.unsplash.com/photo-1608611397022-77148ae87729?auto=format&fit=crop&q=80&w=200" }
  ],
  grasas: [
    { name: "Aceite de Oliva", img: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&q=80&w=200" },
    { name: "Nueces", img: "https://images.unsplash.com/photo-1554522965-c322634a41cb?auto=format&fit=crop&q=80&w=200" },
    { name: "Almendras", img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=200" },
    { name: "Semillas de Chía", img: "https://images.unsplash.com/photo-1626245100652-f1f33580536e?auto=format&fit=crop&q=80&w=200" }
  ]
};

const Nutrition: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'express' | 'personalized'>('express');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [generatedMeal, setGeneratedMeal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const toggleIngredient = (ing: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  const handleGenerateMeal = async () => {
    if (selectedIngredients.length === 0) return;
    setLoading(true);
    try {
      const result = await generatePersonalizedMeal(selectedIngredients);
      setGeneratedMeal(result);
    } catch (error) {
      setGeneratedMeal("Lo siento, hubo un error al crear tu plato.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (price: number) => {
    setCartCount(prev => prev + 1);
    setCartTotal(prev => prev + price);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark transition-colors overflow-hidden relative">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#111814]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#28392f] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-text-main dark:text-white text-xl font-black tracking-tight uppercase">Performance Nutrition</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-[10px] text-text-muted dark:text-text-secondary font-bold uppercase tracking-widest">Saldo</span>
            <span className="text-sm font-bold text-primary">${cartTotal.toFixed(2)}</span>
          </div>
          <button className="flex items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-[#28392f] hover:bg-primary hover:text-background-dark text-text-main dark:text-white transition-all relative">
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 pt-6 hide-scrollbar">
        <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-8">

          {/* Hero Section & Tab Toggle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-[#28392f]">
            <div className="flex flex-col gap-2">
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Nutre tu Biología</h1>
              <p className="text-text-muted dark:text-text-secondary text-base">Selecciona un plan rápido o diseña tu propia ruta metabólica.</p>
            </div>
            <div className="bg-slate-100 dark:bg-[#28392f] p-1 rounded-xl flex items-center w-full md:w-auto">
              <button
                onClick={() => setActiveTab('express')}
                className={`flex-1 py-2 px-6 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'express' ? 'bg-white dark:bg-background-dark text-text-main dark:text-white shadow-card' : 'text-text-muted dark:text-text-secondary hover:text-text-main dark:hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-lg">bolt</span>
                Express
              </button>
              <button
                onClick={() => setActiveTab('personalized')}
                className={`flex-1 py-2 px-6 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'personalized' ? 'bg-white dark:bg-background-dark text-text-main dark:text-white shadow-card' : 'text-text-muted dark:text-text-secondary hover:text-text-main dark:hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-lg">tune</span>
                Personalized
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full">

              {activeTab === 'express' ? (
                /* Express View: Ready-made Meals */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {expressMeals.map(meal => (
                    <div key={meal.id} className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-2xl shadow-card border border-border-light dark:border-white/5 overflow-hidden hover:border-primary/50 transition-all">
                      <div className="aspect-video w-full overflow-hidden relative">
                        <div
                          className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url("${meal.img}")` }}
                        ></div>
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-text-main dark:text-white uppercase tracking-widest shadow-sm">
                          {meal.tag}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col gap-4">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{meal.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-white/60 mt-1">{meal.desc}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono">
                          <span className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70 px-2 py-1 rounded">{meal.cal} kcal</span>
                          <span className="text-slate-400 dark:text-white/30">{meal.macros}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                          <span className="text-lg font-black text-slate-900 dark:text-white">${meal.price.toFixed(2)}</span>
                          <button
                            onClick={() => addToCart(meal.price)}
                            className="bg-primary hover:bg-primary-hover text-slate-900 text-sm font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                          >
                            Pedir ahora
                            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Personalized View: Ingredient Selector */
                <div className="flex flex-col gap-8">
                  <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-card border border-border-light dark:border-white/5">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl">restaurant_menu</span>
                      Diseña tu Plato
                    </h3>

                    <div className="space-y-8">
                      {Object.entries(ingredientsList).map(([category, items]) => (
                        <div key={category} className="flex flex-col gap-3">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">{category}</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {items.map(ing => (
                              <button
                                key={ing.name}
                                onClick={() => toggleIngredient(ing.name)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all border group relative overflow-hidden ${selectedIngredients.includes(ing.name)
                                  ? 'bg-primary/10 border-primary shadow-sm shadow-primary/20'
                                  : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 hover:border-primary/50'
                                  }`}
                              >
                                <div className="w-full aspect-square rounded-lg bg-cover bg-center" style={{ backgroundImage: `url("${ing.img}")` }}></div>
                                <span className={`text-sm font-bold transition-colors ${selectedIngredients.includes(ing.name)
                                  ? 'text-slate-900 dark:text-white'
                                  : 'text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white'
                                  }`}>
                                  {ing.name}
                                </span>
                                {selectedIngredients.includes(ing.name) && (
                                  <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                                    <span className="material-symbols-outlined text-[10px] text-white">check</span>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5">
                      <button
                        onClick={handleGenerateMeal}
                        disabled={selectedIngredients.length === 0 || loading}
                        className="w-full bg-slate-900 dark:bg-primary hover:bg-black dark:hover:bg-primary-hover text-white dark:text-slate-900 font-black py-4 rounded-2xl shadow-xl shadow-primary/10 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed group"
                      >
                        {loading ? (
                          <>
                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Procesando nutrición...
                          </>
                        ) : (
                          <>
                            <span>Generar mi plato AI</span>
                            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">auto_awesome</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {generatedMeal && (
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20 animate-fade-in-up">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-primary filled">verified</span>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">Tu Receta Optimizada</h4>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-white/80 whitespace-pre-line leading-relaxed">
                        {generatedMeal}
                      </div>
                      <div className="mt-6 flex gap-3">
                        <button className="flex-1 py-3 bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-sm">save</span>
                          Guardar receta
                        </button>
                        <button
                          onClick={() => addToCart(15.00)}
                          className="flex-1 py-3 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                          Pedir ingredientes ($15.00)
                          <span className="material-symbols-outlined text-sm">shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Sticky Sidebar Info */}
            <aside className="lg:w-[340px] w-full flex-shrink-0 space-y-6 lg:sticky lg:top-4 h-fit">
              <div className="glass-card p-6 rounded-2xl overflow-hidden relative group">
                <div className="absolute -right-4 -top-4 size-20 bg-primary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Tu Perfil Metabólico
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-white/50">Meta Diaria</span>
                    <span className="font-bold text-slate-900 dark:text-white">2,400 kcal</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 text-center uppercase font-bold tracking-widest">1,560 kcal consumidas hoy</p>
                </div>
              </div>

              <div className="bg-slate-900 dark:bg-surface-dark p-6 rounded-2xl text-white shadow-xl shadow-black/20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">eco</span>
                  Sourcing Local
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Todos nuestros ingredientes "Personalized" provienen de granjas sostenibles de tu zona seleccionadas por nuestro motor AI.
                </p>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">Garantía SanFitness</span>
                    <span className="text-[10px] opacity-60 uppercase tracking-widest">Organic & GMO Free</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
