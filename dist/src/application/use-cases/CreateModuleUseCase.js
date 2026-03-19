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
        (0, validators_1.ensureString)(input.courseId, 'courseId');
        (0, validators_1.ensureString)(input.title, 'title');
        const normalizedTitle = input.title.trim();
        (0, validators_1.ensureMinLength)(normalizedTitle, 4, 'title');
        (0, validators_1.ensurePositiveInteger)(input.position, 'position');
        const course = await this.courseRepository.findCourseById(input.courseId);
        if (!course) {
            throw new AppError_1.NotFoundError('Course not found');
        }
        const existingPosition = await this.courseRepository.findModuleByCourseAndPosition(input.courseId, input.position);
        if (existingPosition) {
            throw new AppError_1.ConflictError('Module position already used in this course');
        }
        const moduleEntity = {
            id: (0, id_1.createId)(),
            courseId: input.courseId,
            title: normalizedTitle,
            position: input.position
        };
        return this.courseRepository.createModule(moduleEntity);
    }
}
exports.CreateModuleUseCase = CreateModuleUseCase;
//# sourceMappingURL=CreateModuleUseCase.js.map