"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLearningCatalogUseCase = void 0;
class ListLearningCatalogUseCase {
    courseRepository;
    resourceRepository;
    constructor(courseRepository, resourceRepository) {
        this.courseRepository = courseRepository;
        this.resourceRepository = resourceRepository;
    }
    async execute() {
        const courses = await this.courseRepository.listPublishedCourses();
        const items = [];
        for (const course of courses) {
            const modules = await this.courseRepository.listModulesByCourse(course.id);
            const moduleWithLessons = [];
            for (const module of modules) {
                const lessons = await this.courseRepository.listLessonsByModule(module.id);
                moduleWithLessons.push({ module, lessons });
            }
            items.push({ course, modules: moduleWithLessons });
        }
        const resources = await this.resourceRepository.listByCategory();
        return {
            items,
            resources
        };
    }
}
exports.ListLearningCatalogUseCase = ListLearningCatalogUseCase;
//# sourceMappingURL=ListLearningCatalogUseCase.js.map