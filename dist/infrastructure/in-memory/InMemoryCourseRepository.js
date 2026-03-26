"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCourseRepository = void 0;
class InMemoryCourseRepository {
    courses = [];
    modules = [];
    lessons = [];
    steps = [];
    async createCourse(course) {
        this.courses.push(course);
        return course;
    }
    async createModule(module) {
        this.modules.push(module);
        return module;
    }
    async createLesson(lesson) {
        this.lessons.push(lesson);
        return lesson;
    }
    async addLessonStep(step) {
        this.steps.push(step);
        return step;
    }
    async findCourseBySlug(slug) {
        return this.courses.find((course) => course.slug === slug) ?? null;
    }
    async findCourseById(courseId) {
        return this.courses.find((course) => course.id === courseId) ?? null;
    }
    async findModuleById(moduleId) {
        return this.modules.find((moduleItem) => moduleItem.id === moduleId) ?? null;
    }
    async findLessonById(lessonId) {
        return this.lessons.find((lesson) => lesson.id === lessonId) ?? null;
    }
    async listModulesByCourse(courseId) {
        return this.modules
            .filter((moduleItem) => moduleItem.courseId === courseId)
            .sort((a, b) => a.position - b.position);
    }
    async listLessonsByModule(moduleId) {
        return this.lessons.filter((lesson) => lesson.moduleId === moduleId);
    }
    async listStepsByLesson(lessonId) {
        return this.steps
            .filter((step) => step.lessonId === lessonId)
            .sort((a, b) => a.position - b.position);
    }
    async listPublishedCourses() {
        return this.courses.filter((course) => course.published);
    }
}
exports.InMemoryCourseRepository = InMemoryCourseRepository;
//# sourceMappingURL=InMemoryCourseRepository.js.map