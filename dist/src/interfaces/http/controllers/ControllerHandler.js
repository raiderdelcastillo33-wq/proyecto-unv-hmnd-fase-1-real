"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleController = handleController;
const ApiResponse_1 = require("../../../shared/types/ApiResponse");
async function handleController(operation) {
    try {
        const result = await operation();
        return (0, ApiResponse_1.success)(result);
    }
    catch (error) {
        return (0, ApiResponse_1.failure)(error);
    }
}
//# sourceMappingURL=ControllerHandler.js.map