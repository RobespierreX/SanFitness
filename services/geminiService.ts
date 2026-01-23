
import { GoogleGenerativeAI } from "@google/generative-ai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log("SanFitness AI: Checking API Key...", apiKey ? "Present" : "Missing");
  return new GoogleGenerativeAI(apiKey || '');
};

export const analyzeMealImage = async (base64Image: string): Promise<string> => {
  const genAI = getAI();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent([
      { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
      "Analyze this meal. Provide a breakdown of estimated calories, macros (P/C/F), and its probable impact on metabolic health (glucose spike potential). Keep it concise."
    ]);
    return result.response.text();
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "Unable to analyze image.";
  }
};

export const generatePersonalizedMeal = async (ingredients: string[]): Promise<string> => {
  const genAI = getAI();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Create a healthy, high-performance fitness meal recipe using some or all of these ingredients: ${ingredients.join(', ')}. Include a name for the dish, estimated calories, macros (Protein, Carbs, Fats), and brief cooking steps. Format it clearly for a mobile app.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating meal:", error);
    return "I couldn't create a meal with those ingredients right now.";
  }
};

export const chatWithGemini = async (history: { role: string, parts: { text: string }[] }[], message: string) => {
  const genAI = getAI();
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const chat = model.startChat({
    history: history.map(h => ({
      role: h.role,
      parts: h.parts.map(p => ({ text: p.text }))
    }))
  });

  try {
    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Error in chat:", error);
    throw error;
  }
};

export const findNearbyWellness = async (query: string, location?: { lat: number, lng: number }) => {
  // Note: The standard GoogleGenerativeAI SDK for web does not usually directly support
  // the 'googleMaps' tool in the same way as the specialized SDKs or Vertex AI.
  // We will attempt a standard generation, but map features might be limited without the specific tool.
  const genAI = getAI();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Find ${query} nearby${location ? ` (around lat: ${location.lat}, lng: ${location.lng})` : ''}. Provide details about their services and quality.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Mocking sources since map tool is not direct in this SDK version for this simple implementation
    return { text, sources: [] };
  } catch (error) {
    console.error("Error finding wellness:", error);
    return { text: "Could not find nearby wellness locations.", sources: [] };
  }
};
