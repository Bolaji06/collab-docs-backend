import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
export class AIService {
    /**
     * Summarize the given text
     */
    async summarizeText(text) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured");
        }
        const prompt = `Summarize the following text in a concise manner, using bullet points if appropriate:\n\n${text}`;
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            console.error("AI Summarization failed:", error);
            throw new Error(`Failed to summarize text: ${error.message || error}`);
        }
    }
    async listAvailableModels() {
    }
    /**
     * Improve the writing style and grammar
     */
    async improveWriting(text) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured");
        }
        const prompt = `Act as a professional editor. Improve the following text for clarity, grammar, and professional tone while preserving the original meaning:\n\n${text}`;
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            console.error("AI Writing Improvement failed:", error);
            throw new Error("Failed to improve writing");
        }
    }
    /**
     * Extract structured meeting notes from transcript or raw notes
     */
    async extractMeetingNotes(text) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured");
        }
        const prompt = `Process the following text into professional meeting notes. Include sections for:
1. Summary of Discussion
2. Key Decisions Made
3. Action Items (with owners if mentioned)
4. Next Steps

Text to process:\n\n${text}`;
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            console.error("AI Meeting Notes extraction failed:", error);
            throw new Error("Failed to extract meeting notes");
        }
    }
    /**
     * Suggest relevant tags based on content
     */
    async suggestTags(text) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured");
        }
        const prompt = `Analyze the following text and suggest 3-5 relevant short tags (single words or short phrases). Return only the tags separated by commas, nothing else:\n\n${text}`;
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text().split(',').map(tag => tag.trim());
        }
        catch (error) {
            console.error("AI Tag Suggestion failed:", error);
            throw new Error("Failed to suggest tags");
        }
    }
    /**
     * Deep analysis of document alignment, conflicts, and decisions.
     */
    async analyzeAlignment(documentContent, intent) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured");
        }
        const prompt = `Act as a Collaboration Strategist. Analyze the following document content (Document Intent: ${intent}) and provide a synthesis of:
1. Current Alignment: How well is the team aligned based on the structure?
2. Critical Decisions: What are the top 3 decisions made?
3. Unresolved Conflicts/Risks: What is blocking progress or requires immediate attention?
4. Momentum Score (0-100): Based on the presence of tasks and acknowledgments.

Document Content:\n\n${documentContent}`;
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            console.error("AI Alignment Analysis failed:", error);
            throw new Error("Failed to analyze alignment");
        }
    }
}
export const aiService = new AIService();
//# sourceMappingURL=ai-service.js.map