
import { GoogleGenAI, Type } from "@google/genai";
import { SEOAuditReport } from "../types.ts";

// Using Flash for better reliability and lower latency in structured JSON generation
const MODEL_NAME = 'gemini-3-flash-preview';

export const analyzeRepository = async (siteUrl: string): Promise<SEOAuditReport> => {
  const apiKey = process.env.API_KEY || "";
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Perform a comprehensive "Cognitive & Technical SEO Audit" for the domain: ${siteUrl}.
  
  Act as a Senior Technical SEO Consultant. Analyze the site across these specific dimensions:
  1. Entity SEO & Topical Authority: Knowledge Graph associations.
  2. Search Intent Alignment: Content type vs User psychology.
  3. NLP Sentiment: Tone consistency for the niche.
  4. Technical Depth: JS Rendering, hydration, and Core Web Vitals.
  5. Architecture: Crawl budget and link equity.
  6. AI/SGE Readiness: Visibility in AI summaries.
  7. Security: Trust signals (SSL, headers).

  Use the googleSearch tool to gather real-time data about the site's footprint and technical profile.
  Return a valid JSON object following the requested schema.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        // Lowering safety thresholds to allow technical analysis of security/vulnerabilities
        safetySettings: [
          { category: 'HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ],
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectName: { type: Type.STRING },
            overallScore: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            metrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  status: { type: Type.STRING }
                },
                required: ["category", "score", "status"]
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  actionableStep: { type: Type.STRING }
                },
                required: ["id", "title", "impact", "category", "description", "actionableStep"]
              }
            }
          },
          required: ["projectName", "overallScore", "summary", "metrics", "recommendations"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("The model returned an empty response.");
    }

    const report: SEOAuditReport = JSON.parse(textOutput);
    
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      report.sourceUrls = response.candidates[0].groundingMetadata.groundingChunks
        .filter(chunk => chunk.web)
        .map(chunk => ({
          title: chunk.web?.title || "Search Reference",
          uri: chunk.web?.uri || ""
        }));
    }

    return report;
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    
    // Check for specific common errors
    if (error.message?.includes("429")) {
      throw new Error("Rate limit exceeded. Please wait a moment before trying again.");
    }
    if (error.message?.includes("403")) {
      throw new Error("API Key permissions error. Please check your Google Cloud Console project.");
    }
    
    throw new Error(`Audit failed: ${error.message || "Unknown technical error during scan."}`);
  }
};
