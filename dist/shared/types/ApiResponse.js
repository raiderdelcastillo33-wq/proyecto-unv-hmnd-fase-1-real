"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
exports.failure = failure;
const AppError_1 = require("../errors/AppError");
function success(data) {
    return { success: true, data };
}
function failure(error) {
    if (error instanceof AppError_1.AppError) {
        return {
            success: false,
            error: {
                code: error.code,
                message: error.message,
                details: error.details
            }
        };
    }
    if (error instanceof Error) {
        return {
            success: false,
            error: {
                code: 'UNKNOWN_ERROR',
                message: error.message
            }
        };
    }
    return {
        success: false,
        error: {
            code: 'UNKNOWN_ERROR',
            message: 'Unexpected error'
        }
    };
}
//# sourceMappingURL=ApiResponse.js.map