export interface AIRequest {
    feature: 'assistant' | 'prompt-improver' | 'code-feedback';
    prompt: string;
    context?: string;
}
export interface AIResult {
    output: string;
    estimatedCostUsd: number;
    model: string;
}
export interface AIProvider {
    generate(request: AIRequest): Promise<AIResult>;
}
//# sourceMappingURL=AIProvider.d.ts.map