export type ErrorCode = 'VALIDATION_ERROR' | 'NOT_FOUND' | 'CONFLICT' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INFRASTRUCTURE_ERROR' | 'UNKNOWN_ERROR';
export declare class AppError extends Error {
    readonly code: ErrorCode;
    readonly details: Record<string, string> | undefined;
    constructor(code: ErrorCode, message: string, details?: Record<string, string>);
}
export declare class ValidationError extends AppError {
    constructor(message: string, details?: Record<string, string>);
}
export declare class NotFoundError extends AppError {
    constructor(message: string);
}
export declare class ConflictError extends AppError {
    constructor(message: string);
}
export declare class InfrastructureError extends AppError {
    constructor(message: string);
}
//# sourceMappingURL=AppError.d.ts.map