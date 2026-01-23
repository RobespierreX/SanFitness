
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMealImage = async (base64Image: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: "Analyze this meal. Provide a breakdown of estimated calories, macros (P/C/F), and its probable impact on metabolic health (glucose spike potential). Keep it concise." }
      ]
    },
    config: {
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text || "Unable to analyze image.";
};

export const generatePersonalizedMeal = async (ingredients: string[]): Promise<string> => {
  const ai = getAI();
  const prompt = `Create a healthy, high-performance fitness meal recipe using some or all of these ingredients: ${ingredients.join(', ')}. Include a name for the dish, estimated calories, macros (Protein, Carbs, Fats), and brief cooking steps. Format it clearly for a mobile app.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
      topP: 0.8,
    }
  });
  return response.text || "I couldn't create a meal with those ingredients right now.";
};

export const chatWithGemini = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are SanBot, an expert metabolic health and performance coach for SanFitness. You provide science-backed advice on nutrition, bio-hacking, and performance optimization.",
    }
  });
  
  const result = await chat.sendMessage({ message });
  return result.text;
};

export const findNearbyWellness = async (query: string, location?: {lat: number, lng: number}) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Find ${query} nearby. Provide details about their services and quality.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: location ? {
            latitude: location.lat,
            longitude: location.lng
          } : undefined
        }
      }
    }
  });

  const text = response.text || "";
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  const sources = chunks
    .filter((c: any) => c.maps)
    .map((c: any) => ({
      title: c.maps.title,
      uri: c.maps.uri
    }));

  return { text, sources };
};
