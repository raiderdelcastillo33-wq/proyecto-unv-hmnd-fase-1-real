"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const ApiResponse_1 = require("../../../shared/types/ApiResponse");
class UserController {
    registerUserUseCase;
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    async register(input) {
        try {
            const user = await this.registerUserUseCase.execute(input);
            return (0, ApiResponse_1.success)({ id: user.id });
        }
        catch (error) {
            return (0, ApiResponse_1.failure)(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map