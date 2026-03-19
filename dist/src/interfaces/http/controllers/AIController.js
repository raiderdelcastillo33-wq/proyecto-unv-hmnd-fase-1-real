"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
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
}
exports.AIController = AIController;
//# sourceMappingURL=AIController.js.map