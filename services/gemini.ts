
import { GoogleGenAI, Type } from "@google/genai";
import { SEOAuditReport } from "../types.ts";

const MODEL_NAME = 'gemini-3-pro-preview';

export const analyzeRepository = async (siteUrl: string): Promise<SEOAuditReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  const prompt = `Perform the "Ultimate 360° Cognitive SEO Audit" for: ${siteUrl}. 
  Act as a Global SEO Architect. This is the final stage of analysis covering the "Cognitive Search" layer:
  
  1. **Entity SEO & Topical Authority**: Identify the primary "Entities" (People, Places, Things) the site is associated with. Evaluate the site's "Topical Breadth" and how it connects to the Google Knowledge Graph.
  2. **Search Intent Alignment**: Does the content type (Video, Blog, Tool) match the user's intent (Informational, Transactional, Navigational)? Identify "Intent Mismatches."
  3. **NLP Sentiment & Tone**: Analyze the writing sentiment. Is the tone appropriate for the E-E-A-T requirements of the niche (e.g., high-trust for finance, conversational for lifestyle)?
  4. **JavaScript & Deep Tech**: Rendering pipeline efficiency, hydration bottlenecks, and Core Web Vitals (INP focus).
  5. **Crawl Budget & Security**: Internal link equity distribution and security headers (CSP, HSTS).
  6. **AI-Search (SGE) Readiness**: Formatting for AI citation and information gain.
  7. **Visual & Voice Search**: Metadata for Alexa/Siri and visual search optimization.

  Use Google Search to fetch real-time data about the domain's entity associations, ranking stability, and technical health.
  Produce a JSON report that ranks the site against these cognitive pillars.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
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
                  category: { type: Type.STRING, description: "Include 'Entity SEO', 'Intent Alignment', 'Sentiment', 'SGE Readiness', etc." },
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

    const report: SEOAuditReport = JSON.parse(response.text || "{}");
    
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      report.sourceUrls = response.candidates[0].groundingMetadata.groundingChunks
        .filter(chunk => chunk.web)
        .map(chunk => ({
          title: chunk.web?.title || "Search Reference",
          uri: chunk.web?.uri || ""
        }));
    }

    return report;
  } catch (error) {
    console.error("Cognitive Audit Error:", error);
    throw new Error("Audit failed. The site profile is too complex or restricted for a deep cognitive scan.");
  }
};
