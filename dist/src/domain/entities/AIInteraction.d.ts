export interface AIInteraction {
    id: string;
    userId: string;
    feature: 'assistant' | 'prompt-improver' | 'code-feedback';
    prompt: string;
    response: string;
    estimatedCostUsd: number;
    createdAt: Date;
}
//# sourceMappingURL=AIInteraction.d.ts.map