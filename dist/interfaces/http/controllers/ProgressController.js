"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressController = void 0;
const ApiResponse_1 = require("../../../shared/types/ApiResponse");
class ProgressController {
    completeLessonUseCase;
    constructor(completeLessonUseCase) {
        this.completeLessonUseCase = completeLessonUseCase;
    }
    async completeLesson(input) {
        try {
            const result = await this.completeLessonUseCase.execute(input);
            return (0, ApiResponse_1.success)({ id: result.id });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
}
exports.ProgressController = ProgressController;
//# sourceMappingURL=ProgressController.js.map