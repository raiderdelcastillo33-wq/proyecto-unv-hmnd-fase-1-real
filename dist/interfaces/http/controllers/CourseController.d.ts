import { AddLessonStepInput, CreateCourseInput, CreateLessonInput, CreateModuleInput } from '../../../application/dto/CourseDTO';
import { CreateCourseUseCase } from '../../../application/use-cases/CreateCourseUseCase';
import { CreateLessonUseCase } from '../../../application/use-cases/CreateLessonUseCase';
import { CreateModuleUseCase } from '../../../application/use-cases/CreateModuleUseCase';
import { ListLearningCatalogUseCase } from '../../../application/use-cases/ListLearningCatalogUseCase';
import { ApiResponse } from '../../../shared/types/ApiResponse';
export declare class CourseController {
    private readonly createCourseUseCase;
    private readonly createModuleUseCase;
    private readonly createLessonUseCase;
    private readonly listLearningCatalogUseCase;
    constructor(createCourseUseCase: CreateCourseUseCase, createModuleUseCase: CreateModuleUseCase, createLessonUseCase: CreateLessonUseCase, listLearningCatalogUseCase: ListLearningCatalogUseCase);
    createCourse(input: CreateCourseInput): Promise<ApiResponse<{
        id: string;
    }>>;
    createModule(input: CreateModuleInput): Promise<ApiResponse<{
        id: string;
    }>>;
    createLesson(input: CreateLessonInput): Promise<ApiResponse<{
        id: string;
    }>>;
    addLessonStep(input: AddLessonStepInput): Promise<ApiResponse<{
        id: string;
    }>>;
    catalog(): Promise<ApiResponse<unknown>>;
}
//# sourceMappingURL=CourseController.d.ts.map