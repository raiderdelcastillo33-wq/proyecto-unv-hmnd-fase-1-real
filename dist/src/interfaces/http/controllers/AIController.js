"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const demoUser_1 = require("../../../shared/demoUser");
const validators_1 = require("../../../shared/utils/validators");
const ControllerHandler_1 = require("./ControllerHandler");
class AIController {
    askAIAssistantUseCase;
    constructor(askAIAssistantUseCase) {
        this.askAIAssistantUseCase = askAIAssistantUseCase;
    }
    async ask(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            const interaction = await this.askAIAssistantUseCase.execute(input);
            return { id: interaction.id, response: interaction.response };
        });
    }
    async run(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            (0, validators_1.ensureString)(input.input, 'input');
            const prompt = input.input.trim();
            (0, validators_1.ensureMinLength)(prompt, 5, 'input');
            const interaction = await this.askAIAssistantUseCase.execute({
                userId: demoUser_1.DEMO_USER_ID,
                feature: 'assistant',
                prompt
            });
            return { id: interaction.id, response: interaction.response };
        });
    }
}
exports.AIController = AIController;
//# sourceMappingURL=AIController.js.map