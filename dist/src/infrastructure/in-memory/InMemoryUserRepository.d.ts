import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
export declare class InMemoryUserRepository implements UserRepository {
    private users;
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
//# sourceMappingURL=InMemoryUserRepository.d.ts.map