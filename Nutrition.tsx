
import React, { useState } from 'react';
import { generatePersonalizedMeal } from './services/geminiService';
import { useCart } from './context/CartContext';

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
    { name: "Pollo", img: "https://media.istockphoto.com/id/172900971/es/foto/pollo-asado.jpg?s=612x612&w=0&k=20&c=EI8Neiq9N5OJF_ncCCPp2U3-KlpOs4GRhkggls5WW34=" },
    { name: "Huevos", img: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/265cd39f-3722-49b1-83dc-9910b020d73f/Derivates/5a1a45f0-0cb3-474d-a8dd-7b6be2de938d.jpg" },
    { name: "Salmón", img: "https://fotografias.lasexta.com/clipping/cmsimages01/2024/07/09/062D9BE1-C5F5-4E73-B49B-F826D771E128/salmon_104.jpg?crop=4480,4480,x1720,y0&width=1200&height=1200&optimize=low&format=webply" },
    { name: "Tofu", img: "https://www.vegetanea.es/wp-content/uploads/2024/07/0907-VEG-Escritorio-Receta3-tofu-casero.jpg" },
    { name: "Pavo", img: "https://images.pexels.com/photos/5769384/pexels-photo-5769384.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Atún", img: "https://rancaguatv.cl/images/2021/MAYO/ATUN-UCM.jpg" }
  ],
  vegetales: [
    { name: "Espinaca", img: "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Brócoli", img: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Tomates", img: "https://images.pexels.com/photos/53328/pexels-photo-53328.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Lechuga", img: "https://images.pexels.com/photos/1199564/pexels-photo-1199564.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Aguacate", img: "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Espárragos", img: "https://images.pexels.com/photos/4791307/pexels-photo-4791307.jpeg?auto=compress&cs=tinysrgb&w=200" }
  ],
  carbohidratos: [
    { name: "Quinoa", img: "https://images.pexels.com/photos/3338573/pexels-photo-3338573.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Arroz Integral", img: "https://images.pexels.com/photos/4110464/pexels-photo-4110464.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Camote", img: "https://images.pexels.com/photos/5424535/pexels-photo-5424535.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Avena", img: "https://images.pexels.com/photos/6744837/pexels-photo-6744837.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Pasta Integral", img: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=200" }
  ],
  grasas: [
    { name: "Aceite de Oliva", img: "https://images.pexels.com/photos/4192667/pexels-photo-4192667.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Nueces", img: "https://images.pexels.com/photos/1093153/pexels-photo-1093153.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Almendras", img: "https://images.pexels.com/photos/1109355/pexels-photo-1109355.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name: "Semillas de Chía", img: "https://images.pexels.com/photos/13627254/pexels-photo-13627254.jpeg?auto=compress&cs=tinysrgb&w=200" }
  ]
};

interface Recipe {
  id: string;
  title: string;
  description: string;
  time: string;
  portions: number;
  macros: string;
  img: string;
  tag: string;
  ingredients: string[];
  instructions: string[];
}

const healthyRecipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Ensalada Mediterránea con Pollo',
    description: 'Fresca ensalada con pollo a la parrilla, tomates cherry, pepino, queso feta y aceitunas, aderezada con aceite de oliva.',
    time: '20 Min',
    portions: 2,
    macros: 'P: 30g | C: 12g | F: 18g',
    img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Baja en Carbos',
    ingredients: ['1 pechuga de pollo', '1 taza de tomates cherry', '1 pepino', '50g de queso feta', 'Aceitunas negras', 'Aceite de oliva extra virgen'],
    instructions: ['Asa la pechuga de pollo a la parrilla hasta que esté dorada.', 'Corta los tomates cherry, el pepino y el pollo en cubos rápidos.', 'Mezcla todo en un bowl grande con las aceitunas y el queso feta desmenuzado.', 'Adereza con aceite de oliva, sal, pimienta y un toque de orégano.']
  },
  {
    id: 'r2',
    title: 'Bowl de Quinoa y Salmón',
    description: 'Bowl nutritivo con quinoa, salmón al horno, palta, edamames y un toque de salsa de soja baja en sodio.',
    time: '35 Min',
    portions: 1,
    macros: 'P: 35g | C: 45g | F: 22g',
    img: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Omega-3',
    ingredients: ['150g de filete de salmón', '1/2 taza de quinoa cocida', '1/2 palta (aguacate)', '1/4 taza de edamames', 'Salsa de soja baja en sodio', 'Semillas de sésamo'],
    instructions: ['Hornea el salmón condimentado a 200°C por 15-20 minutos.', 'Lava y cocina la quinoa a fuego lento hasta que el agua se evapore.', 'En un bowl, coloca como base la quinoa, añade el salmón, la palta en rodajas y los edamames.', 'Decora con semillas de sésamo y baña ligeramente con salsa de soja.']
  },
  {
    id: 'r3',
    title: 'Avena Nocturna con Frutos Rojos',
    description: 'Deliciosa avena preparada la noche anterior con leche de almendras, semillas de chía y mix de berries frescos.',
    time: '5 Min',
    portions: 1,
    macros: 'P: 12g | C: 40g | F: 8g',
    img: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Desayuno',
    ingredients: ['1/2 taza de avena en hojuelas', '1 taza de leche de almendras', '1 cda de semillas de chía', '1/2 taza de frutos rojos (fresas, arándanos)', '1 cdita de miel (opcional)'],
    instructions: ['En un frasco o recipiente con tapa, mezcla la avena, la chía y la leche de almendras.', 'Añade la miel si deseas endulzar un poco, mezcla bien y tapa el frasco.', 'Refrigera toda la noche (mínimo 4 horas).', 'A la mañana siguiente, destapa y agrega los frutos rojos frescos por encima.']
  },
  {
    id: 'r4',
    title: 'Smoothie Proteico de Plátano',
    description: 'Batido rápido con proteína whey sabor vainilla, plátano, espinaca y mantequilla de maní.',
    time: '5 Min',
    portions: 1,
    macros: 'P: 28g | C: 35g | F: 10g',
    img: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Post-Entreno',
    ingredients: ['1 scoop de proteína de vainilla', '1 plátano maduro congelado', '1 puñado grande de espinacas', '1 cda de mantequilla de maní sin azúcar', '1 taza de leche de almendras o agua', 'Hielo al gusto'],
    instructions: ['Coloca todos los ingredientes en una licuadora de alta potencia.', 'Licúa a velocidad máxima hasta obtener una mezcla suave y homogénea.', 'Sirve inmediatamente para aprovechar al máximo las vitaminas y su textura cremosa.']
  },
  {
    id: 'r5',
    title: 'Tacos de Lechuga con Pavo',
    description: 'Carne de pavo molida sazonada con especias orientales, servida en hojas de lechuga crocante.',
    time: '25 Min',
    portions: 3,
    macros: 'P: 25g | C: 8g | F: 12g',
    img: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Hiperproteico',
    ingredients: ['400g de carne molida de pavo', '1 hoja grande de lechuga romana o iceberg por taco', '1 cda de aceite de sésamo', '2 dientes de ajo picados', '1 cdita de jengibre rallado', 'Salsa de soja baja en sodio y cebollín chino al gusto'],
    instructions: ['Dora el ajo y el jengibre rallado en una sartén con aceite de sésamo.', 'Añade la carne molida de pavo y cocina hasta dorar por completo.', 'Vierte un poco de salsa de soja, mezcla bien y retira del fuego.', 'Toma las hojas de lechuga limpias y úsalas como tortillas (tacos), rellenando con el pavo y agregando cebollín arriba.']
  },
  {
    id: 'r6',
    title: 'Pancakes de Avena y Plátano',
    description: 'Pancakes saludables hechos con solo tres ingredientes: avena, plátano y huevos. Ideales para el fin de semana.',
    time: '15 Min',
    portions: 2,
    macros: 'P: 15g | C: 45g | F: 12g',
    img: 'https://images.pexels.com/photos/2091494/pexels-photo-2091494.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Cheat Meal Fit',
    ingredients: ['1 taza de avena licuada (harina de avena)', '1 plátano maduro', '2 huevos grandes', '1 cdita de polvo para hornear (opcional)', 'Canela al gusto', 'Aceite de coco en spray (para la sartén)'],
    instructions: ['Licúa los huevos, el plátano pelado, la harina de avena, la canela y el polvo de hornear hasta hacer una masa líquida espesa.', 'Calienta un sartén antiadherente a fuego medio y rocía aceite de coco.', 'Vierte un poco de la mezcla y cocina hasta que salgan burbujas en la parte superior; voltéalo y cocina 1 minuto más.', 'Sirve calientes. Puedes acompañar con miel sin azúcar y arándanos.']
  }
];

const Nutrition: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'express' | 'personalized' | 'recipes'>('express');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [generatedMeal, setGeneratedMeal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { addToCart: addItemToCart, cartTotal, itemCount } = useCart();

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

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark transition-colors overflow-hidden relative">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#111814]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#28392f] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-text-main dark:text-white text-xl font-black tracking-tight uppercase">Performance Nutrition</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-[10px] text-text-muted dark:text-text-secondary font-bold uppercase tracking-widest">Saldo</span>
            <span className="text-sm font-bold text-primary">S/ {cartTotal.toFixed(2)}</span>
          </div>
          <button onClick={useCart().toggleCart} className="flex items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-[#28392f] hover:bg-primary hover:text-background-dark text-text-main dark:text-white transition-all relative">
            <span className="material-symbols-outlined">shopping_bag</span>
            {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center">{itemCount}</span>}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 pt-6 hide-scrollbar">
        <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-8">

          {/* Hero Section & Tab Toggle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-[#28392f]">
            <div className="flex flex-col gap-2">
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Nutre tu Biología</h1>
              <p className="text-text-muted dark:text-text-secondary text-base">Selecciona un plan rápido, prepáralo tú mismo o diseña tu propia ruta.</p>
            </div>
            <div className="bg-slate-100 dark:bg-[#28392f] p-1 rounded-xl flex items-center md:w-auto overflow-hidden">
              <button
                onClick={() => setActiveTab('express')}
                className={`flex-1 py-1.5 px-3 sm:px-5 rounded-lg text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all ${activeTab === 'express' ? 'bg-white dark:bg-background-dark text-text-main dark:text-white shadow-card' : 'text-text-muted dark:text-text-secondary hover:text-text-main dark:hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Express
              </button>
              <button
                onClick={() => setActiveTab('personalized')}
                className={`flex-1 py-1.5 px-3 sm:px-5 rounded-lg text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all ${activeTab === 'personalized' ? 'bg-white dark:bg-background-dark text-text-main dark:text-white shadow-card' : 'text-text-muted dark:text-text-secondary hover:text-text-main dark:hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                Personalized
              </button>
              <button
                onClick={() => setActiveTab('recipes')}
                className={`flex-1 py-1.5 px-3 sm:px-5 rounded-lg text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all ${activeTab === 'recipes' ? 'bg-white dark:bg-background-dark text-text-main dark:text-white shadow-card' : 'text-text-muted dark:text-text-secondary hover:text-text-main dark:hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                Recetas
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full">

              {activeTab === 'express' && (
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
                          <span className="text-lg font-black text-slate-900 dark:text-white">S/ {meal.price.toFixed(2)}</span>
                          <button
                            onClick={() => addItemToCart({ id: meal.id, title: meal.name, price: meal.price, image: meal.img })}
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
              )}

              {activeTab === 'personalized' && (
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
                          onClick={() => addItemToCart({ id: 'custom-ingredients-' + Date.now(), title: 'Pack Ingredientes Personalizados', price: 15.00 })}
                          className="flex-1 py-3 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                          Pedir ingredientes (S/ 15.00)
                          <span className="material-symbols-outlined text-sm">shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'recipes' && (
                /* Recipes View: Healthy Recipes */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {healthyRecipes.map(recipe => (
                    <div key={recipe.id} className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-2xl shadow-card border border-border-light dark:border-white/5 overflow-hidden hover:border-primary/50 transition-all">
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-text-main dark:text-white uppercase tracking-widest shadow-sm">
                          {recipe.tag}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col gap-4 flex-1">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{recipe.title}</h4>
                          <p className="text-sm text-slate-500 dark:text-white/60 mt-1">{recipe.description}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono mt-auto">
                          <span className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70 px-2 py-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {recipe.time}</span>
                          <span className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70 px-2 py-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">restaurant_menu</span> {recipe.portions} {recipe.portions === 1 ? 'Porción' : 'Porciones'}</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                          <span className="text-slate-400 dark:text-white/30 text-xs font-mono">{recipe.macros}</span>
                          <button
                            onClick={() => setSelectedRecipe(recipe)}
                            className="bg-primary hover:bg-primary-hover text-slate-900 text-sm font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                            Ver receta
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 drop-shadow-2xl">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedRecipe(null)}></div>
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-surface-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up border border-border-light dark:border-white/10">
            {/* Header Image */}
            <div className="w-full h-48 sm:h-64 relative flex-shrink-0">
              <img src={selectedRecipe.img} alt={selectedRecipe.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 size-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-2 border border-primary/30">
                  {selectedRecipe.tag}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">{selectedRecipe.title}</h2>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
              <p className="text-slate-600 dark:text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                {selectedRecipe.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex-1 min-w-[120px] bg-slate-50 dark:bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 border border-slate-100 dark:border-white/5">
                  <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{selectedRecipe.time}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tiempo</span>
                </div>
                <div className="flex-1 min-w-[120px] bg-slate-50 dark:bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 border border-slate-100 dark:border-white/5">
                  <span className="material-symbols-outlined text-primary text-xl">restaurant_menu</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{selectedRecipe.portions}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Porciones</span>
                </div>
                <div className="flex-1 min-w-[120px] bg-slate-50 dark:bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 border border-slate-100 dark:border-white/5">
                  <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white text-center whitespace-break-spaces pt-1">{selectedRecipe.macros.replace(/\|/g, '\n')}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Macros</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">kitchen</span>
                  Ingredientes
                </h3>
                <ul className="space-y-3">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-slate-700 dark:text-white/80">
                      <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      </div>
                      <span className="pt-0.5">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">format_list_numbered</span>
                  Instrucciones
                </h3>
                <div className="space-y-4">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="size-7 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center font-black text-slate-900 dark:text-white text-xs flex-shrink-0 border border-slate-200 dark:border-white/5">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-700 dark:text-white/80 pt-1 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-white/5 flex gap-3 bg-slate-50 dark:bg-[#151f19]">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="flex-1 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold py-3 rounded-xl transition-colors border border-slate-200 dark:border-white/5"
              >
                Cerrar
              </button>
              <button
                className="flex-[2] bg-primary hover:bg-primary-hover text-slate-900 font-bold py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">favorite</span>
                Guardar Receta en mis Favoritos
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Nutrition;
