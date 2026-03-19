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
        (0, validators_1.ensureString)(input.email, 'email');
        (0, validators_1.ensureString)(input.displayName, 'displayName');
        const normalizedEmail = input.email.trim().toLowerCase();
        const normalizedDisplayName = input.displayName.trim();
        (0, validators_1.ensureEmail)(normalizedEmail);
        (0, validators_1.ensureNonEmpty)(normalizedDisplayName, 'displayName');
        (0, validators_1.ensureMinLength)(normalizedDisplayName, 3, 'displayName');
        if (!Array.isArray(input.goals)) {
            throw new AppError_1.ValidationError('goals must be an array', { goals: 'invalid_type' });
        }
        const normalizedGoals = input.goals
            .filter((goal) => typeof goal === 'string')
            .map((goal) => goal.trim())
            .filter((goal) => goal.length > 0);
        if (normalizedGoals.length === 0) {
            throw new AppError_1.ValidationError('goals must include at least one valid value', { goals: 'empty' });
        }
        const existing = await this.userRepository.findByEmail(normalizedEmail);
        if (existing) {
            throw new AppError_1.ConflictError('User already exists with this email');
        }
        const user = {
            id: (0, id_1.createId)(),
            email: normalizedEmail,
            displayName: normalizedDisplayName,
            role: 'student',
            level: input.level,
            goals: normalizedGoals,
            createdAt: new Date()
        };
        return this.userRepository.create(user);
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=RegisterUserUseCase.js.map