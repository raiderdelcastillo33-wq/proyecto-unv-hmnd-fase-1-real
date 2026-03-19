import { CompleteLessonInput } from '../dto/ProgressDTO';
import { Progress } from '../../domain/entities/Progress';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
import { ProgressRepository } from '../../domain/repositories/ProgressRepository';
import { UserRepository } from '../../domain/repositories/UserRepository';
export declare class CompleteLessonUseCase {
    private readonly userRepository;
    private readonly courseRepository;
    private readonly progressRepository;
    constructor(userRepository: UserRepository, courseRepository: CourseRepository, progressRepository: ProgressRepository);
    execute(input: CompleteLessonInput): Promise<Progress>;
}
//# sourceMappingURL=CompleteLessonUseCase.d.ts.map