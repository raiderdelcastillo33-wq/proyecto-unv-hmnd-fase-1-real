"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureString = ensureString;
exports.ensureNonEmpty = ensureNonEmpty;
exports.ensureMinLength = ensureMinLength;
exports.ensureEmail = ensureEmail;
exports.ensurePositiveInteger = ensurePositiveInteger;
exports.ensureSlug = ensureSlug;
const AppError_1 = require("../errors/AppError");
function ensureString(value, field) {
    if (typeof value !== 'string') {
        throw new AppError_1.ValidationError(`${field} must be a string`, { [field]: 'invalid_type' });
    }
}
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
function ensurePositiveInteger(value, field) {
    if (!Number.isInteger(value) || value <= 0) {
        throw new AppError_1.ValidationError(`${field} must be a positive integer`, {
            [field]: 'invalid_number'
        });
    }
}
function ensureSlug(slug, field) {
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
        throw new AppError_1.ValidationError(`${field} must contain only lowercase letters, numbers, and dashes`, {
            [field]: 'invalid_slug'
        });
    }
}
//# sourceMappingURL=validators.js.map