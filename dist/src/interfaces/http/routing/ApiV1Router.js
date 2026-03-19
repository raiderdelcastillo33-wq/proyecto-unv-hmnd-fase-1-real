"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1Router = void 0;
const AppError_1 = require("../../../shared/errors/AppError");
const ApiResponse_1 = require("../../../shared/types/ApiResponse");
class ApiV1Router {
    userController;
    courseController;
    learningRoomController;
    progressController;
    aiController;
    routes;
    constructor(userController, courseController, learningRoomController, progressController, aiController) {
        this.userController = userController;
        this.courseController = courseController;
        this.learningRoomController = learningRoomController;
        this.progressController = progressController;
        this.aiController = aiController;
        this.routes = {
            '/api/v1/users/register': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.userController.register(body)
            },
            '/api/v1/courses/create': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.courseController.createCourse(body)
            },
            '/api/v1/modules/create': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.courseController.createModule(body)
            },
            '/api/v1/lessons/create': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.courseController.createLesson(body)
            },
            '/api/v1/lessons/steps/add': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.courseController.addLessonStep(body)
            },
            '/api/v1/catalog/list': {
                method: 'GET',
                requiresBody: false,
                handler: () => this.courseController.catalog()
            },
            '/api/v1/progress/complete': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.progressController.completeLesson(body)
            },
            '/api/v1/learning-room/posts/create': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.learningRoomController.createPost(body)
            },
            '/api/v1/learning-room/comments/create': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.learningRoomController.createComment(body)
            },
            '/api/v1/ai/ask': {
                method: 'POST',
                requiresBody: true,
                handler: (body) => this.aiController.ask(body)
            }
        };
    }
    async handle(path, body, method = 'POST') {
        try {
            const route = this.routes[path];
            if (!route) {
                return {
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: `Route ${path} not found`
                    }
                };
            }
            if (method !== route.method) {
                throw new AppError_1.ValidationError(`${path} only supports ${route.method}`, { method: 'invalid' });
            }
            const requestBody = route.requiresBody ? this.toBodyObject(body) : {};
            return route.handler(requestBody);
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
    toBodyObject(body) {
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            throw new AppError_1.ValidationError('Body must be a valid JSON object', { body: 'invalid_type' });
        }
        return body;
    }
}
exports.ApiV1Router = ApiV1Router;
//# sourceMappingURL=ApiV1Router.js.map