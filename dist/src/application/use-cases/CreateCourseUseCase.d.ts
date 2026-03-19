import { CreateCourseInput } from '../dto/CourseDTO';
import { Course } from '../../domain/entities/Course';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
export declare class CreateCourseUseCase {
    private readonly courseRepository;
    constructor(courseRepository: CourseRepository);
    execute(input: CreateCourseInput): Promise<Course>;
}
//# sourceMappingURL=CreateCourseUseCase.d.ts.map