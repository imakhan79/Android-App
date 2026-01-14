
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeApkMetadata = async (activities: string[], permissions: string[]) => {
  const prompt = `Analyze this Android APK metadata and identify potential high-risk GUI components.
  Activities: ${activities.join(', ')}
  Permissions: ${permissions.join(', ')}
  
  Categorize identified components into:
  1. Gesture-sensitive (swipe, long press, drawers)
  2. Runtime-loaded (lazy lists, network-driven)
  3. Modal/interruptive (dialogs, popups)
  4. Context-aware (location, permission state)
  
  Return a JSON array of objects with: { selector, category, riskScore (0-100), reasoning }`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            selector: { type: Type.STRING },
            category: { type: Type.STRING },
            riskScore: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["selector", "category", "riskScore", "reasoning"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const getRlAgentReasoning = async (state: string, possibleActions: string[]) => {
  const prompt = `You are an RL Actor-Critic agent exploring an Android app. 
  Current State: ${state}
  Available Actions: ${possibleActions.join(', ')}
  
  Explain your next choice in 2 sentences. One sentence for the Actor's policy choice, one for the Critic's value estimation.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};
