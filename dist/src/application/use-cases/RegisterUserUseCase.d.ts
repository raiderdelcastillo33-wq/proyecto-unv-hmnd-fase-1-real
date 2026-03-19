import { RegisterUserInput } from '../dto/UserDTO';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
export declare class RegisterUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: RegisterUserInput): Promise<User>;
}
//# sourceMappingURL=RegisterUserUseCase.d.ts.map