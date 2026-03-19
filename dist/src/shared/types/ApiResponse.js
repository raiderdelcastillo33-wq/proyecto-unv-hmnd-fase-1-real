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
        const errorPayload = {
            code: error.code,
            message: error.message
        };
        if (error.details) {
            errorPayload.details = error.details;
        }
        return {
            success: false,
            error: errorPayload
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