"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockTests = mockTests;
const node_assert_1 = __importDefault(require("node:assert"));
const AskAIAssistantUseCase_1 = require("../../src/application/use-cases/AskAIAssistantUseCase");
class FakeUserRepository {
    users;
    constructor(users) {
        this.users = users;
    }
    async create(user) {
        this.users.push(user);
        return user;
    }
    async findById(id) {
        return this.users.find((user) => user.id === id) ?? null;
    }
    async findByEmail(email) {
        return this.users.find((user) => user.email === email) ?? null;
    }
}
class FakeInteractionRepository {
    saved = [];
    async create(interaction) {
        this.saved.push(interaction);
        return interaction;
    }
    async listByUser(userId) {
        return this.saved.filter((item) => item.userId === userId);
    }
}
class SpyAIProvider {
    response;
    shouldThrow;
    calls = [];
    constructor(response, shouldThrow = false) {
        this.response = response;
        this.shouldThrow = shouldThrow;
    }
    async generate(request) {
        this.calls.push(request);
        if (this.shouldThrow) {
            throw new Error('provider_down');
        }
        return this.response;
    }
}
function createInput(userId) {
    return {
        userId,
        feature: 'assistant',
        prompt: '  Construye un plan de estudio de TypeScript  '
    };
}
function mockTests() {
    return [
        {
            name: 'Mocks: AskAIAssistantUseCase normaliza prompt y guarda interaccion',
            run: async () => {
                const userId = 'user-1';
                const userRepo = new FakeUserRepository([
                    {
                        id: userId,
                        email: 'mock@example.com',
                        displayName: 'Mock User',
                        role: 'student',
                        level: 'beginner',
                        goals: ['goal'],
                        createdAt: new Date()
                    }
                ]);
                const interactions = new FakeInteractionRepository();
                const provider = new SpyAIProvider({
                    output: 'respuesta mock',
                    estimatedCostUsd: 0.42,
                    model: 'fake-model'
                });
                const useCase = new AskAIAssistantUseCase_1.AskAIAssistantUseCase(userRepo, provider, interactions);
                const result = await useCase.execute(createInput(userId));
                node_assert_1.default.equal(provider.calls.length, 1);
                node_assert_1.default.equal(provider.calls[0]?.prompt, 'Construye un plan de estudio de TypeScript');
                node_assert_1.default.equal(result.response, 'respuesta mock');
                node_assert_1.default.equal(interactions.saved.length, 1);
            }
        },
        {
            name: 'Mocks: AskAIAssistantUseCase propaga error de proveedor externo',
            run: async () => {
                const userId = 'user-2';
                const userRepo = new FakeUserRepository([
                    {
                        id: userId,
                        email: 'mock2@example.com',
                        displayName: 'Mock User 2',
                        role: 'student',
                        level: 'beginner',
                        goals: ['goal'],
                        createdAt: new Date()
                    }
                ]);
                const interactions = new FakeInteractionRepository();
                const provider = new SpyAIProvider({
                    output: 'unused',
                    estimatedCostUsd: 0.1,
                    model: 'fake-model'
                }, true);
                const useCase = new AskAIAssistantUseCase_1.AskAIAssistantUseCase(userRepo, provider, interactions);
                let failed = false;
                try {
                    await useCase.execute(createInput(userId));
                }
                catch (error) {
                    failed = true;
                    if (!(error instanceof Error)) {
                        throw new Error('Expected Error instance');
                    }
                    node_assert_1.default.equal(error.message, 'provider_down');
                }
                node_assert_1.default.equal(failed, true);
                node_assert_1.default.equal(interactions.saved.length, 0);
            }
        }
    ];
}
//# sourceMappingURL=mocks.test.js.map