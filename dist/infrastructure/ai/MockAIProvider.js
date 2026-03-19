"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAIProvider = void 0;
class MockAIProvider {
    async generate(request) {
        const output = `Sugerencia para ${request.feature}: divide tu objetivo en pasos, valida cada paso y automatiza iteraciones.`;
        return {
            output,
            estimatedCostUsd: 0.001,
            model: 'mock-gpt'
        };
    }
}
exports.MockAIProvider = MockAIProvider;
//# sourceMappingURL=MockAIProvider.js.map