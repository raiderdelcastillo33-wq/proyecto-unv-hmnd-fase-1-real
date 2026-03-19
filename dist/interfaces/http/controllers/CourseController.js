"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const ApiResponse_1 = require("../../../shared/types/ApiResponse");
class CourseController {
    createCourseUseCase;
    createModuleUseCase;
    createLessonUseCase;
    listLearningCatalogUseCase;
    constructor(createCourseUseCase, createModuleUseCase, createLessonUseCase, listLearningCatalogUseCase) {
        this.createCourseUseCase = createCourseUseCase;
        this.createModuleUseCase = createModuleUseCase;
        this.createLessonUseCase = createLessonUseCase;
        this.listLearningCatalogUseCase = listLearningCatalogUseCase;
    }
    async createCourse(input) {
        try {
            const course = await this.createCourseUseCase.execute(input);
            return (0, ApiResponse_1.success)({ id: course.id });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
    async createModule(input) {
        try {
            const moduleItem = await this.createModuleUseCase.execute(input);
            return (0, ApiResponse_1.success)({ id: moduleItem.id });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
    async createLesson(input) {
        try {
            const lesson = await this.createLessonUseCase.createLesson(input);
            return (0, ApiResponse_1.success)({ id: lesson.id });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
    async addLessonStep(input) {
        try {
            const step = await this.createLessonUseCase.addStep(input);
            return (0, ApiResponse_1.success)({ id: step.id });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
    async catalog() {
        try {
            const catalog = await this.listLearningCatalogUseCase.execute();
            return (0, ApiResponse_1.success)(catalog);
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=CourseController.js.map