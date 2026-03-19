import { RegisterUserInput } from '../../../application/dto/UserDTO';
import { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase';
import { ApiResponse } from '../../../shared/types/ApiResponse';
export declare class UserController {
    private readonly registerUserUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase);
    register(input: RegisterUserInput): Promise<ApiResponse<{
        id: string;
    }>>;
}
//# sourceMappingURL=UserController.d.ts.map