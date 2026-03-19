import { CompleteLessonInput } from '../../../application/dto/ProgressDTO';
import { CompleteLessonUseCase } from '../../../application/use-cases/CompleteLessonUseCase';
import { ApiResponse } from '../../../shared/types/ApiResponse';
export declare class ProgressController {
    private readonly completeLessonUseCase;
    constructor(completeLessonUseCase: CompleteLessonUseCase);
    completeLesson(input: CompleteLessonInput): Promise<ApiResponse<{
        id: string;
    }>>;
}
//# sourceMappingURL=ProgressController.d.ts.map