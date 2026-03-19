"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const ApiResponse_1 = require("../../../shared/types/ApiResponse");
class AIController {
    askAIAssistantUseCase;
    constructor(askAIAssistantUseCase) {
        this.askAIAssistantUseCase = askAIAssistantUseCase;
    }
    async ask(input) {
        try {
            const interaction = await this.askAIAssistantUseCase.execute(input);
            return (0, ApiResponse_1.success)({ id: interaction.id, response: interaction.response });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
}
exports.AIController = AIController;
//# sourceMappingURL=AIController.js.map