"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteLessonUseCase = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const id_1 = require("../../shared/utils/id");
class CompleteLessonUseCase {
    userRepository;
    courseRepository;
    progressRepository;
    constructor(userRepository, courseRepository, progressRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.progressRepository = progressRepository;
    }
    async execute(input) {
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new AppError_1.NotFoundError('User not found');
        }
        const lesson = await this.courseRepository.findLessonById(input.lessonId);
        if (!lesson) {
            throw new AppError_1.NotFoundError('Lesson not found');
        }
        const existing = await this.progressRepository.findByUserAndLesson(input.userId, input.lessonId);
        const record = {
            id: existing?.id ?? (0, id_1.createId)(),
            userId: input.userId,
            lessonId: input.lessonId,
            completed: true,
            completedAt: new Date()
        };
        return this.progressRepository.upsert(record);
    }
}
exports.CompleteLessonUseCase = CompleteLessonUseCase;
//# sourceMappingURL=CompleteLessonUseCase.js.map