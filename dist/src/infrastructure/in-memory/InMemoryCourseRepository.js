"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCourseRepository = void 0;
const makeCoursePositionKey = (courseId, position) => `${courseId}:${position}`;
const makeModuleSlugKey = (moduleId, slug) => `${moduleId}:${slug}`;
const makeLessonPositionKey = (lessonId, position) => `${lessonId}:${position}`;
class InMemoryCourseRepository {
    coursesById = new Map();
    courseIdBySlug = new Map();
    modulesById = new Map();
    moduleIdsByCourse = new Map();
    moduleIdByCoursePosition = new Map();
    lessonsById = new Map();
    lessonIdsByModule = new Map();
    lessonIdByModuleSlug = new Map();
    stepsById = new Map();
    stepIdsByLesson = new Map();
    stepIdByLessonPosition = new Map();
    async createCourse(course) {
        this.coursesById.set(course.id, course);
        this.courseIdBySlug.set(course.slug, course.id);
        return course;
    }
    async createModule(module) {
        this.modulesById.set(module.id, module);
        const moduleIds = this.moduleIdsByCourse.get(module.courseId) ?? [];
        moduleIds.push(module.id);
        this.moduleIdsByCourse.set(module.courseId, moduleIds);
        this.moduleIdByCoursePosition.set(makeCoursePositionKey(module.courseId, module.position), module.id);
        return module;
    }
    async createLesson(lesson) {
        this.lessonsById.set(lesson.id, lesson);
        const lessonIds = this.lessonIdsByModule.get(lesson.moduleId) ?? [];
        lessonIds.push(lesson.id);
        this.lessonIdsByModule.set(lesson.moduleId, lessonIds);
        this.lessonIdByModuleSlug.set(makeModuleSlugKey(lesson.moduleId, lesson.slug), lesson.id);
        return lesson;
    }
    async addLessonStep(step) {
        this.stepsById.set(step.id, step);
        const stepIds = this.stepIdsByLesson.get(step.lessonId) ?? [];
        stepIds.push(step.id);
        this.stepIdsByLesson.set(step.lessonId, stepIds);
        this.stepIdByLessonPosition.set(makeLessonPositionKey(step.lessonId, step.position), step.id);
        return step;
    }
    async findCourseBySlug(slug) {
        const courseId = this.courseIdBySlug.get(slug);
        if (!courseId) {
            return null;
        }
        return this.coursesById.get(courseId) ?? null;
    }
    async findCourseById(courseId) {
        return this.coursesById.get(courseId) ?? null;
    }
    async findModuleById(moduleId) {
        return this.modulesById.get(moduleId) ?? null;
    }
    async findModuleByCourseAndPosition(courseId, position) {
        const moduleId = this.moduleIdByCoursePosition.get(makeCoursePositionKey(courseId, position));
        if (!moduleId) {
            return null;
        }
        return this.modulesById.get(moduleId) ?? null;
    }
    async findLessonById(lessonId) {
        return this.lessonsById.get(lessonId) ?? null;
    }
    async findLessonByModuleAndSlug(moduleId, slug) {
        const lessonId = this.lessonIdByModuleSlug.get(makeModuleSlugKey(moduleId, slug));
        if (!lessonId) {
            return null;
        }
        return this.lessonsById.get(lessonId) ?? null;
    }
    async findStepByLessonAndPosition(lessonId, position) {
        const stepId = this.stepIdByLessonPosition.get(makeLessonPositionKey(lessonId, position));
        if (!stepId) {
            return null;
        }
        return this.stepsById.get(stepId) ?? null;
    }
    async listModulesByCourse(courseId) {
        const moduleIds = this.moduleIdsByCourse.get(courseId) ?? [];
        const modules = moduleIds
            .map((moduleId) => this.modulesById.get(moduleId))
            .filter((moduleItem) => Boolean(moduleItem));
        modules.sort((a, b) => a.position - b.position);
        return modules;
    }
    async listLessonsByModule(moduleId) {
        const lessonIds = this.lessonIdsByModule.get(moduleId) ?? [];
        return lessonIds
            .map((lessonId) => this.lessonsById.get(lessonId))
            .filter((lesson) => Boolean(lesson));
    }
    async listStepsByLesson(lessonId) {
        const stepIds = this.stepIdsByLesson.get(lessonId) ?? [];
        const steps = stepIds
            .map((stepId) => this.stepsById.get(stepId))
            .filter((step) => Boolean(step));
        steps.sort((a, b) => a.position - b.position);
        return steps;
    }
    async listPublishedCourses() {
        return [...this.coursesById.values()].filter((course) => course.published);
    }
}
exports.InMemoryCourseRepository = InMemoryCourseRepository;
//# sourceMappingURL=InMemoryCourseRepository.js.map