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
        const [courses, resources] = await Promise.all([
            this.courseRepository.listPublishedCourses(),
            this.resourceRepository.listByCategory()
        ]);
        const items = await Promise.all(courses.map(async (course) => {
            const modules = await this.courseRepository.listModulesByCourse(course.id);
            const moduleItems = await Promise.all(modules.map(async (module) => {
                const lessons = await this.courseRepository.listLessonsByModule(module.id);
                return { module, lessons };
            }));
            return { course, modules: moduleItems };
        }));
        return {
            items,
            resources
        };
    }
}
exports.ListLearningCatalogUseCase = ListLearningCatalogUseCase;
//# sourceMappingURL=ListLearningCatalogUseCase.js.map