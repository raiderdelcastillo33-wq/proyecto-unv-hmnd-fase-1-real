"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureNonEmpty = ensureNonEmpty;
exports.ensureMinLength = ensureMinLength;
exports.ensureEmail = ensureEmail;
const AppError_1 = require("../errors/AppError");
function ensureNonEmpty(value, field) {
    if (!value || value.trim().length === 0) {
        throw new AppError_1.ValidationError(`${field} is required`, { [field]: 'required' });
    }
}
function ensureMinLength(value, min, field) {
    if (value.trim().length < min) {
        throw new AppError_1.ValidationError(`${field} must have at least ${min} characters`, {
            [field]: `min:${min}`
        });
    }
}
function ensureEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new AppError_1.ValidationError('Invalid email format', { email: 'invalid' });
    }
}
//# sourceMappingURL=validators.js.map