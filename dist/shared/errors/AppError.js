"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureError = exports.ConflictError = exports.NotFoundError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    code;
    details;
    constructor(code, message, details) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.details = details;
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message, details) {
        super('VALIDATION_ERROR', message, details);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends AppError {
    constructor(message) {
        super('NOT_FOUND', message);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message) {
        super('CONFLICT', message);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class InfrastructureError extends AppError {
    constructor(message) {
        super('INFRASTRUCTURE_ERROR', message);
        this.name = 'InfrastructureError';
    }
}
exports.InfrastructureError = InfrastructureError;
//# sourceMappingURL=AppError.js.map