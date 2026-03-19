"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModuleUseCase = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const validators_1 = require("../../shared/utils/validators");
const id_1 = require("../../shared/utils/id");
class CreateModuleUseCase {
    courseRepository;
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async execute(input) {
        (0, validators_1.ensureMinLength)(input.title, 4, 'title');
        const course = await this.courseRepository.findCourseById(input.courseId);
        if (!course) {
            throw new AppError_1.NotFoundError('Course not found');
        }
        const moduleEntity = {
            id: (0, id_1.createId)(),
            courseId: input.courseId,
            title: input.title,
            position: input.position
        };
        return this.courseRepository.createModule(moduleEntity);
    }
}
exports.CreateModuleUseCase = CreateModuleUseCase;
//# sourceMappingURL=CreateModuleUseCase.js.map