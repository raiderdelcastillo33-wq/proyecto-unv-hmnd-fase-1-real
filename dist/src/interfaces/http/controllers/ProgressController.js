"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressController = void 0;
const ControllerHandler_1 = require("./ControllerHandler");
class ProgressController {
    completeLessonUseCase;
    constructor(completeLessonUseCase) {
        this.completeLessonUseCase = completeLessonUseCase;
    }
    async completeLesson(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            const result = await this.completeLessonUseCase.execute(input);
            return { id: result.id };
        });
    }
}
exports.ProgressController = ProgressController;
//# sourceMappingURL=ProgressController.js.map