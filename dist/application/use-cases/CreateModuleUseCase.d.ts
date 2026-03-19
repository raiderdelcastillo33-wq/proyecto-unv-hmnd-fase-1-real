import { CreateModuleInput } from '../dto/CourseDTO';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
import { CourseModule } from '../../domain/entities/Module';
export declare class CreateModuleUseCase {
    private readonly courseRepository;
    constructor(courseRepository: CourseRepository);
    execute(input: CreateModuleInput): Promise<CourseModule>;
}
//# sourceMappingURL=CreateModuleUseCase.d.ts.map