import { AddLessonStepInput, CreateLessonInput } from '../dto/CourseDTO';
import { Lesson } from '../../domain/entities/Lesson';
import { LessonStep } from '../../domain/entities/LessonStep';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
export declare class CreateLessonUseCase {
    private readonly courseRepository;
    constructor(courseRepository: CourseRepository);
    createLesson(input: CreateLessonInput): Promise<Lesson>;
    addStep(input: AddLessonStepInput): Promise<LessonStep>;
}
//# sourceMappingURL=CreateLessonUseCase.d.ts.map