"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskAIAssistantUseCase = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const validators_1 = require("../../shared/utils/validators");
const id_1 = require("../../shared/utils/id");
class AskAIAssistantUseCase {
    userRepository;
    aiProvider;
    interactionRepository;
    constructor(userRepository, aiProvider, interactionRepository) {
        this.userRepository = userRepository;
        this.aiProvider = aiProvider;
        this.interactionRepository = interactionRepository;
    }
    async execute(input) {
        (0, validators_1.ensureString)(input.userId, 'userId');
        (0, validators_1.ensureString)(input.prompt, 'prompt');
        const normalizedPrompt = input.prompt.trim();
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new AppError_1.NotFoundError('User not found');
        }
        (0, validators_1.ensureMinLength)(normalizedPrompt, 5, 'prompt');
        const requestPayload = {
            feature: input.feature,
            prompt: normalizedPrompt
        };
        const generated = await this.aiProvider.generate(input.context
            ? {
                ...requestPayload,
                context: input.context
            }
            : requestPayload);
        const interaction = {
            id: (0, id_1.createId)(),
            userId: input.userId,
            feature: input.feature,
            prompt: normalizedPrompt,
            response: generated.output,
            estimatedCostUsd: generated.estimatedCostUsd,
            createdAt: new Date()
        };
        return this.interactionRepository.create(interaction);
    }
}
exports.AskAIAssistantUseCase = AskAIAssistantUseCase;
//# sourceMappingURL=AskAIAssistantUseCase.js.map