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
        (0, validators_1.ensureString)(input.moduleId, 'moduleId');
        (0, validators_1.ensureString)(input.slug, 'slug');
        (0, validators_1.ensureString)(input.title, 'title');
        (0, validators_1.ensureString)(input.objective, 'objective');
        (0, validators_1.ensureString)(input.content, 'content');
        const normalizedSlug = input.slug.trim().toLowerCase();
        const normalizedTitle = input.title.trim();
        const normalizedObjective = input.objective.trim();
        const normalizedContent = input.content.trim();
        (0, validators_1.ensureNonEmpty)(normalizedSlug, 'slug');
        (0, validators_1.ensureMinLength)(normalizedSlug, 3, 'slug');
        (0, validators_1.ensureSlug)(normalizedSlug, 'slug');
        (0, validators_1.ensureMinLength)(normalizedTitle, 4, 'title');
        (0, validators_1.ensureMinLength)(normalizedObjective, 8, 'objective');
        (0, validators_1.ensureMinLength)(normalizedContent, 20, 'content');
        (0, validators_1.ensurePositiveInteger)(input.durationMinutes, 'durationMinutes');
        const module = await this.courseRepository.findModuleById(input.moduleId);
        if (!module) {
            throw new AppError_1.NotFoundError('Module not found');
        }
        const existingLesson = await this.courseRepository.findLessonByModuleAndSlug(input.moduleId, normalizedSlug);
        if (existingLesson) {
            throw new AppError_1.ConflictError('Lesson slug already exists in this module');
        }
        const lesson = {
            id: (0, id_1.createId)(),
            moduleId: input.moduleId,
            slug: normalizedSlug,
            title: normalizedTitle,
            objective: normalizedObjective,
            durationMinutes: input.durationMinutes,
            type: input.type,
            content: normalizedContent,
            createdAt: new Date()
        };
        return this.courseRepository.createLesson(lesson);
    }
    async addStep(input) {
        (0, validators_1.ensureString)(input.lessonId, 'lessonId');
        (0, validators_1.ensureString)(input.title, 'title');
        (0, validators_1.ensureString)(input.instruction, 'instruction');
        const normalizedTitle = input.title.trim();
        const normalizedInstruction = input.instruction.trim();
        (0, validators_1.ensureMinLength)(normalizedTitle, 3, 'title');
        (0, validators_1.ensureMinLength)(normalizedInstruction, 10, 'instruction');
        (0, validators_1.ensurePositiveInteger)(input.position, 'position');
        const lesson = await this.courseRepository.findLessonById(input.lessonId);
        if (!lesson) {
            throw new AppError_1.NotFoundError('Lesson not found');
        }
        const existingStep = await this.courseRepository.findStepByLessonAndPosition(input.lessonId, input.position);
        if (existingStep) {
            throw new AppError_1.ConflictError('Step position already exists in this lesson');
        }
        const step = {
            id: (0, id_1.createId)(),
            lessonId: input.lessonId,
            position: input.position,
            title: normalizedTitle,
            instruction: normalizedInstruction
        };
        return this.courseRepository.addLessonStep(step);
    }
}
exports.CreateLessonUseCase = CreateLessonUseCase;
//# sourceMappingURL=CreateLessonUseCase.js.map