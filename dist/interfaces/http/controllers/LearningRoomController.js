"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningRoomController = void 0;
const ApiResponse_1 = require("../../../shared/types/ApiResponse");
class LearningRoomController {
    createLearningPostUseCase;
    constructor(createLearningPostUseCase) {
        this.createLearningPostUseCase = createLearningPostUseCase;
    }
    async createPost(input) {
        try {
            const post = await this.createLearningPostUseCase.createPost(input);
            return (0, ApiResponse_1.success)({ id: post.id });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
    async createComment(input) {
        try {
            const comment = await this.createLearningPostUseCase.createComment(input);
            return (0, ApiResponse_1.success)({ id: comment.id });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
}
exports.LearningRoomController = LearningRoomController;
//# sourceMappingURL=LearningRoomController.js.map