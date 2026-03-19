"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLessonUseCase = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const validators_1 = require("../../shared/utils/validators");
const id_1 = require("../../shared/utils/id");
class CreateLessonUseCase {
    courseRepository;
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async createLesson(input) {
        (0, validators_1.ensureNonEmpty)(input.slug, 'slug');
        (0, validators_1.ensureMinLength)(input.title, 4, 'title');
        (0, validators_1.ensureMinLength)(input.objective, 8, 'objective');
        (0, validators_1.ensureMinLength)(input.content, 20, 'content');
        const module = await this.courseRepository.findModuleById(input.moduleId);
        if (!module) {
            throw new AppError_1.NotFoundError('Module not found');
        }
        const lesson = {
            id: (0, id_1.createId)(),
            moduleId: input.moduleId,
            slug: input.slug,
            title: input.title,
            objective: input.objective,
            durationMinutes: input.durationMinutes,
            type: input.type,
            content: input.content,
            createdAt: new Date()
        };
        return this.courseRepository.createLesson(lesson);
    }
    async addStep(input) {
        (0, validators_1.ensureMinLength)(input.title, 3, 'title');
        (0, validators_1.ensureMinLength)(input.instruction, 10, 'instruction');
        const lesson = await this.courseRepository.findLessonById(input.lessonId);
        if (!lesson) {
            throw new AppError_1.NotFoundError('Lesson not found');
        }
        const step = {
            id: (0, id_1.createId)(),
            lessonId: input.lessonId,
            position: input.position,
            title: input.title,
            instruction: input.instruction
        };
        return this.courseRepository.addLessonStep(step);
    }
}
exports.CreateLessonUseCase = CreateLessonUseCase;
//# sourceMappingURL=CreateLessonUseCase.js.map