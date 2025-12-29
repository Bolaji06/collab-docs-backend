export const DOCUMENT_TEMPLATES = [
    {
        id: 'rfc',
        name: 'RFC (Request for Comments)',
        description: 'Perfect for proposing new technical designs or policies. Focuses on consensus and risk discovery.',
        intent: 'decision',
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'RFC: [Proposed Feature Name]' }] },
                { type: 'paragraph', content: [{ type: 'text', text: 'Provide a high-level summary of what you are proposing and why.' }] },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'The Decision' }] },
                {
                    type: 'collaborationBlock',
                    attrs: { type: 'decision', status: 'pending', acknowledgments: [] },
                    content: [{ type: 'text', text: 'Should we implement [feature] using [approach]? Please acknowledge alignment below.' }]
                },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Risks & Assumptions' }] },
                {
                    type: 'collaborationBlock',
                    attrs: { type: 'risk', status: 'pending', acknowledgments: [] },
                    content: [{ type: 'text', text: 'Risk 1: Potential performance impact on legacy systems.' }]
                },
                { type: 'paragraph', content: [{ type: 'text', text: 'Add more context here...' }] }
            ]
        }
    },
    {
        id: 'brainstorm',
        name: 'Rapid Brainstorm',
        description: 'Optimized for divergent thinking and quick ideation. Highlights creative gaps.',
        intent: 'brainstorm',
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Brainstorm: [Topic]' }] },
                { type: 'paragraph', content: [{ type: 'text', text: 'Throw all ideas here. No judgment yet.' }] },
                {
                    type: 'collaborationBlock',
                    attrs: { type: 'note', status: 'pending', acknowledgments: [] },
                    content: [{ type: 'text', text: 'Idea A: What if we used a distributed secondary index?' }]
                },
                {
                    type: 'collaborationBlock',
                    attrs: { type: 'question', status: 'pending', acknowledgments: [] },
                    content: [{ type: 'text', text: 'Does this scale to 10M users?' }]
                }
            ]
        }
    },
    {
        id: 'post-mortem',
        name: 'Post-Mortem / Retro',
        description: 'Focuses on accountability and action items from past events.',
        intent: 'execute',
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Incident Post-Mortem: [Event Name]' }] },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'What Happened?' }] },
                { type: 'paragraph', content: [{ type: 'text', text: 'Detailed timeline of events.' }] },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Action Items' }] },
                {
                    type: 'collaborationBlock',
                    attrs: { type: 'task', status: 'pending', acknowledgments: [] },
                    content: [{ type: 'text', text: 'Implement automated rollback for canary deployments.' }]
                }
            ]
        }
    }
];
export class TemplateService {
    getTemplates() {
        return DOCUMENT_TEMPLATES;
    }
    getTemplateById(id) {
        return DOCUMENT_TEMPLATES.find(t => t.id === id);
    }
}
export const templateService = new TemplateService();
//# sourceMappingURL=template-service.js.map