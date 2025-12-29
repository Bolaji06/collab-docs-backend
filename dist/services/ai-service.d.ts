export declare class AIService {
    /**
     * Summarize the given text
     */
    summarizeText(text: string): Promise<string>;
    listAvailableModels(): Promise<void>;
    /**
     * Improve the writing style and grammar
     */
    improveWriting(text: string): Promise<string>;
    /**
     * Extract structured meeting notes from transcript or raw notes
     */
    extractMeetingNotes(text: string): Promise<string>;
    /**
     * Suggest relevant tags based on content
     */
    suggestTags(text: string): Promise<string[]>;
    /**
     * Deep analysis of document alignment, conflicts, and decisions.
     */
    analyzeAlignment(documentContent: string, intent: string): Promise<string>;
}
export declare const aiService: AIService;
//# sourceMappingURL=ai-service.d.ts.map