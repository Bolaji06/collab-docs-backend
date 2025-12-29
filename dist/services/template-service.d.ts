export interface DocumentTemplate {
    id: string;
    name: string;
    description: string;
    intent: 'brainstorm' | 'decision' | 'execute' | 'document';
    content: any;
}
export declare const DOCUMENT_TEMPLATES: DocumentTemplate[];
export declare class TemplateService {
    getTemplates(): DocumentTemplate[];
    getTemplateById(id: string): DocumentTemplate | undefined;
}
export declare const templateService: TemplateService;
//# sourceMappingURL=template-service.d.ts.map