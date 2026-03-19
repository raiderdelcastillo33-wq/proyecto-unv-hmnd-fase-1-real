"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const ControllerHandler_1 = require("./ControllerHandler");
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
        return (0, ControllerHandler_1.handleController)(async () => {
            const course = await this.createCourseUseCase.execute(input);
            return { id: course.id };
        });
    }
    async createModule(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            const moduleItem = await this.createModuleUseCase.execute(input);
            return { id: moduleItem.id };
        });
    }
    async createLesson(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            const lesson = await this.createLessonUseCase.createLesson(input);
            return { id: lesson.id };
        });
    }
    async addLessonStep(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            const step = await this.createLessonUseCase.addStep(input);
            return { id: step.id };
        });
    }
    async catalog() {
        return (0, ControllerHandler_1.handleController)(async () => {
            const catalog = await this.listLearningCatalogUseCase.execute();
            return catalog;
        });
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=CourseController.js.map