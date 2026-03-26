"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1Router = void 0;
class ApiV1Router {
    userController;
    courseController;
    learningRoomController;
    progressController;
    aiController;
    constructor(userController, courseController, learningRoomController, progressController, aiController) {
        this.userController = userController;
        this.courseController = courseController;
        this.learningRoomController = learningRoomController;
        this.progressController = progressController;
        this.aiController = aiController;
    }
    async handle(path, body) {
        switch (path) {
            case '/api/v1/users/register':
                return this.userController.register(body);
            case '/api/v1/courses/create':
                return this.courseController.createCourse(body);
            case '/api/v1/modules/create':
                return this.courseController.createModule(body);
            case '/api/v1/lessons/create':
                return this.courseController.createLesson(body);
            case '/api/v1/lessons/steps/add':
                return this.courseController.addLessonStep(body);
            case '/api/v1/catalog/list':
                return this.courseController.catalog();
            case '/api/v1/progress/complete':
                return this.progressController.completeLesson(body);
            case '/api/v1/learning-room/posts/create':
                return this.learningRoomController.createPost(body);
            case '/api/v1/learning-room/comments/create':
                return this.learningRoomController.createComment(body);
            case '/api/v1/ai/ask':
                return this.aiController.ask(body);
            default:
                return {
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: `Route ${path} not found`
                    }
                };
        }
    }
}
exports.ApiV1Router = ApiV1Router;
//# sourceMappingURL=ApiV1Router.js.map