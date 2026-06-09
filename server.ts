import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON parsing
  app.use(express.json({ limit: '10mb' }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "SignLink AI Backend is running" });
  });

  // Evaluate gesture image against lesson title
  app.post("/api/ai/evaluate", async (req, res) => {
    const { imageData, lessonTitle } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not configured on the server. Falling back to mock response.");
      return res.json({
        score: 85,
        feedback: "Excellent posture! Your fingers are positioned nicely, but try to relax your wrist just a bit more.",
        tips: ["Slightly extend your wrist forward", "Keep your palm flat towards the camera", "Keep fingers close together"]
      });
    }

    try {
      const base64Data = imageData.includes(",") ? imageData.split(",")[1] : imageData;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Data,
            },
          },
          {
            text: `Evaluate this sign attempt for: ${lessonTitle}. Compare the hand pose against standard ASL and provide structured feedback.`,
          },
        ],
        config: {
          systemInstruction: "You are a Sign Language Expert. Analyze the provided image of a user performing an ASL sign. Evaluate for accuracy, provide encouraging feedback, and give 2-3 specific tips for improvement. Return response in strictly valid JSON format.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING },
              tips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["score", "feedback", "tips"],
          },
        },
      });

      if (response.text) {
        return res.json(JSON.parse(response.text.trim()));
      }
      throw new Error("No response text from Gemini");
    } catch (error: any) {
      console.error("AI Evaluation error:", error);
      res.status(500).json({ error: "Failed to evaluate gesture", details: error.message });
    }
  });

  // Translate a stream of gestures into a cohesive English sentence
  app.post("/api/ai/translate", async (req, res) => {
    const { gestureSequence } = req.body;

    if (!gestureSequence || gestureSequence.trim() === "") {
      return res.json({ translatedText: "No signs detected yet." });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not configured on the server. Falling back.");
      return res.json({ translatedText: gestureSequence });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Translate this ASL sign sequence into a simple English sentence: [ ${gestureSequence} ]`,
        config: {
          systemInstruction: "You are a concise ASL translator. Convert the provided sequence of gestures into a simple English sentence.\n\nGUIDELINES:\n1. BE LITERAL: Do not add complex context or flair. Keep it simple.\n2. FINGER-SPELLING: Combine consecutive single letters into names or words.\n3. CLEAN: Remove repetitive signs and obvious noise labels that don't fit.\n4. OUTPUT: Return ONLY the translated sentence. No explanations.",
          temperature: 0.1,
        },
      });

      const text = response.text?.trim().replace(/^"|"$/g, "") || gestureSequence;
      res.json({ translatedText: text });
    } catch (error: any) {
      console.error("AI Translation error:", error);
      res.status(500).json({ error: "Failed to translate gesture sequence", details: error.message });
    }
  });

  // Translate formed English sentence into a requested target language
  app.post("/api/ai/translate-language", async (req, res) => {
    const { sentence, targetLanguage } = req.body;

    if (!sentence || sentence.trim() === "") {
      return res.json({ translatedText: "—" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not configured on the server. Falling back.");
      return res.json({ translatedText: `${sentence} (Translated to ${targetLanguage})` });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Translate this English sentence: "${sentence}" into ${targetLanguage}. Return ONLY the translated sentence, without any explanations, quotes, or markdown.`,
        config: {
          systemInstruction: "You are a professional translator. You translate text accurately into the user's requested target language. Return ONLY the translated text. Do not add conversational padding, explanations, or quotes.",
          temperature: 0.2,
        },
      });

      const text = response.text?.trim().replace(/^"|"$/g, "") || "—";
      res.json({ translatedText: text });
    } catch (error: any) {
      console.error("AI Language Translation error:", error);
      res.status(500).json({ error: "Failed to translate language", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
