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
        (0, validators_1.ensureNonEmpty)(input.slug, 'slug');
        (0, validators_1.ensureMinLength)(input.slug, 3, 'slug');
        (0, validators_1.ensureMinLength)(input.title, 4, 'title');
        (0, validators_1.ensureMinLength)(input.description, 10, 'description');
        const existingCourse = await this.courseRepository.findCourseBySlug(input.slug);
        if (existingCourse) {
            throw new AppError_1.ConflictError('A course with this slug already exists');
        }
        const course = {
            id: (0, id_1.createId)(),
            slug: input.slug,
            title: input.title,
            description: input.description,
            level: input.level,
            published: true,
            createdAt: new Date()
        };
        return this.courseRepository.createCourse(course);
    }
}
exports.CreateCourseUseCase = CreateCourseUseCase;
//# sourceMappingURL=CreateCourseUseCase.js.map