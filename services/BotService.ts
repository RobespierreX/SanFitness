
import { supabase } from './supabaseClient';

interface BotPostTemplate {
    content: string;
    image_url: string;
}

const BOT_POST_TEMPLATES: BotPostTemplate[] = [
    {
        content: "🥗✨ **¡El Poder Oculto de los Vegetales Crudos!** ✨🥗\n\n¡Muy buenos días, equipo! ☀️ ¿Sabían que al comer vegetales crudos mantenemos intactas todas sus enzimas y vitaminas sensibles al calor? 🔥🍅\n\nUna ensalada llena de colores no solo es una delicia para el paladar, ¡sino que es una verdadera inyección de vitalidad pura para tu cuerpo! 💚🥗\n\n👇 ¡Cuéntanos abajo! ¿Cuál es tu vegetal favorito que nunca falta en tus platos? 🥦🥕 #SanFitness #NutriciónRenovada #ComeSano",
        image_url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        content: "🥑🧠 **¡Dale Vida a tu Cerebro con Grasas Saludables!** 🧠🥑\n\n¡No le temas a las grasas! 🚫 Las grasas SALUDABLES que encuentras en el aguacate, las nueces y el aceite de oliva son los mejores amigos de tu salud hormonal y cerebral. 🤩💧\n\n💡 Tip de oro: Agrega medio aguacate a tu desayuno. ¡Te mantendrá súper saciado por horas y tu concentración estará a tope! 🚀💥 #GrasasSaludables #SanFitness #EnergíaMental",
        image_url: "https://images.pexels.com/photos/2228559/pexels-photo-2228559.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        content: "💧💦 **¡El Secreto Mejor Guardado: Hidratación Extrema!** 💦💧\n\n¡Atención equipo! 🚨 Muchas veces nuestro cerebro nos hace creer que tenemos hambre, ¡cuando en realidad solo estamos deshidratados! 😵🥤\n\nAntes de picar algún snack, sírvete un vaso bien grande de agua fría. 🧊💧 Mantenerte hidratado elevará tu rendimiento, hará brillar tu piel y mejorará tu digestión. ✨🥇 ¡Arriba esa botella de agua! 🙌 #HidrataciónTotal #VidaSana #SanFitness",
        image_url: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        content: "🍓🍒 **¡Explosión de Antioxidantes Naturales!** 🍒🍓\n\n¡Protege tu cuerpo con la magia de los frutos rojos! ✨ Las fresas, los arándanos y las frambuesas son verdaderas BOMBAS 💣 de antioxidantes que luchan contra el envejecimiento celular. 🛡️🔥\n\nSon el snack dulce perfecto o la joya de la corona para tu avena mañanera. 🥣🤤 ¡Llena tus días de color y vitalidad! ❤️💜 #Antioxidantes #SuperFoods #SanFitness",
        image_url: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        content: "🐟💪 **¡Construye Músculo con Proteína de Campeones!** 💪🐟\n\n¿Quieres recuperarte más rápido y proteger tu corazón? ❤️‍🔥 ¡El pescado (y sobre todo el salmón) es la clave! 🔑🌊\n\nEs una fuente premium de Omega-3 y pura proteína de altísima calidad para reconstruir tus músculos luego de un buen entrenamiento. 🏋️‍♂️💯 Intenta incluirlo en tu menú al menos un par de veces por semana. 🍽️🔥 #Omega3 #ProteínaPura #SanFitness",
        image_url: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        content: "🥤🌪️ **¡El Smoothie Verde: Tu Batería Matutina!** 🌪️🥤\n\n¿La alarma no sonó y no hay tiempo para hacer el desayuno? ⏰🏃‍♂️ ¡Cero pánico! 🛑\n\nLicúa un buen puñado de espinacas, plátano, tu proteína favorita y leche de almendras para obtener un desayuno COMPLETO en 3 minutos. 🍏⚡ Fibra, vitaminas y energía en un solo vaso mágico. 🪄🔋 ¡A comerse el mundo! 🌍🔥 #DesayunoRápido #GreenSmoothie #SanFitness",
        image_url: "https://images.pexels.com/photos/1233519/pexels-photo-1233519.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        content: "🥜🔥 **¡El Súper-Poder Crujiente de los Frutos Secos!** 🔥🥜\n\n¿Sientes ese clásico bajón de energía a media tarde? 📉🥱 ¡Las almendras y nueces vienen al rescate! 🦸‍♂️🦸‍♀️\n\nUn pequeño puñadito es todo lo que necesitas: te aportan fibra saciante, proteína y grasas top para estabilizar tu azúcar. 🛡️📊 Eso sí... ¡ojo con la porción! 😅 ¡Son pura dinamita energética! 🧨💥 #SnackInteligente #SanFitness #EnergíaPura",
        image_url: "https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

export const BotService = {
    checkAndCreateDailyPost: async (): Promise<boolean> => {
        try {
            // Determinar qué post toca hoy basado en el día del mes
            const today = new Date();
            const dayIndex = today.getDate() % BOT_POST_TEMPLATES.length;
            const postTemplate = BOT_POST_TEMPLATES[dayIndex];

            // Llamar a la función RPC que verifica si ya se publicó hoy e inserta si no
            // Nota: post_as_bot retorna TRUE si se creó el post, FALSE si ya existía
            const { data, error } = await supabase.rpc('post_as_bot', {
                content: postTemplate.content,
                image_url: postTemplate.image_url
            });

            if (error) {
                console.error('Error al intentar crear post del bot:', error);
                return false;
            }

            return data as boolean; // data será true si se creó, false si ya existía
        } catch (err) {
            console.error('Error inesperado en BotService:', err);
            return false;
        }
    }
};
