"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const validators_1 = require("../../shared/utils/validators");
const id_1 = require("../../shared/utils/id");
class RegisterUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        (0, validators_1.ensureEmail)(input.email);
        (0, validators_1.ensureNonEmpty)(input.displayName, 'displayName');
        (0, validators_1.ensureMinLength)(input.displayName, 3, 'displayName');
        const existing = await this.userRepository.findByEmail(input.email);
        if (existing) {
            throw new AppError_1.ConflictError('User already exists with this email');
        }
        const user = {
            id: (0, id_1.createId)(),
            email: input.email,
            displayName: input.displayName.trim(),
            role: 'student',
            level: input.level,
            goals: input.goals,
            createdAt: new Date()
        };
        return this.userRepository.create(user);
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=RegisterUserUseCase.js.map