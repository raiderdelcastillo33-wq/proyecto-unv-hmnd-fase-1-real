"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const ControllerHandler_1 = require("./ControllerHandler");
class UserController {
    registerUserUseCase;
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    async register(input) {
        return (0, ControllerHandler_1.handleController)(async () => {
            const user = await this.registerUserUseCase.execute(input);
            return { id: user.id };
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map