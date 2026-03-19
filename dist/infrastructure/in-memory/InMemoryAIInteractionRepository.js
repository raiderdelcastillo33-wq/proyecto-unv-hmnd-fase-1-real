"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAIInteractionRepository = void 0;
class InMemoryAIInteractionRepository {
    interactions = [];
    async create(interaction) {
        this.interactions.push(interaction);
        return interaction;
    }
    async listByUser(userId) {
        return this.interactions.filter((interaction) => interaction.userId === userId);
    }
}
exports.InMemoryAIInteractionRepository = InMemoryAIInteractionRepository;
//# sourceMappingURL=InMemoryAIInteractionRepository.js.map