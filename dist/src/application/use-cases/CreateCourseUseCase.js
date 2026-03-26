"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseUseCase = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const validators_1 = require("../../shared/utils/validators");
const id_1 = require("../../shared/utils/id");
class CreateCourseUseCase {
    courseRepository;
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async execute(input) {
        (0, validators_1.ensureString)(input.slug, 'slug');
        (0, validators_1.ensureString)(input.title, 'title');
        (0, validators_1.ensureString)(input.description, 'description');
        const normalizedSlug = input.slug.trim().toLowerCase();
        const normalizedTitle = input.title.trim();
        const normalizedDescription = input.description.trim();
        (0, validators_1.ensureNonEmpty)(normalizedSlug, 'slug');
        (0, validators_1.ensureMinLength)(normalizedSlug, 3, 'slug');
        (0, validators_1.ensureSlug)(normalizedSlug, 'slug');
        (0, validators_1.ensureMinLength)(normalizedTitle, 4, 'title');
        (0, validators_1.ensureMinLength)(normalizedDescription, 10, 'description');
        const existingCourse = await this.courseRepository.findCourseBySlug(normalizedSlug);
        if (existingCourse) {
            throw new AppError_1.ConflictError('A course with this slug already exists');
        }
        const course = {
            id: (0, id_1.createId)(),
            slug: normalizedSlug,
            title: normalizedTitle,
            description: normalizedDescription,
            level: input.level,
            published: true,
            createdAt: new Date()
        };
        return this.courseRepository.createCourse(course);
    }
}
exports.CreateCourseUseCase = CreateCourseUseCase;
//# sourceMappingURL=CreateCourseUseCase.js.map