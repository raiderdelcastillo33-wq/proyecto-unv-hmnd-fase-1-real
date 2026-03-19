"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningRoomController = void 0;
const ControllerHandler_1 = require("./ControllerHandler");
class LearningRoomController {
    createLearningPostUseCase;
    constructor(createLearningPostUseCase) {
        this.createLearningPostUseCase = createLearningPostUseCase;
    }
    async createPost(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            const post = await this.createLearningPostUseCase.createPost(input);
            return { id: post.id };
        });
    }
    async createComment(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            const comment = await this.createLearningPostUseCase.createComment(input);
            return { id: comment.id };
        });
    }
}
exports.LearningRoomController = LearningRoomController;
//# sourceMappingURL=LearningRoomController.js.map