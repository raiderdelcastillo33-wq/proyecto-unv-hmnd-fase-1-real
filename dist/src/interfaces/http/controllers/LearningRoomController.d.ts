import { CreateCommentInput, CreatePostInput } from '../../../application/dto/LearningRoomDTO';
import { CreateLearningPostUseCase } from '../../../application/use-cases/CreateLearningPostUseCase';
import { ApiResponse } from '../../../shared/types/ApiResponse';
export declare class LearningRoomController {
    private readonly createLearningPostUseCase;
    constructor(createLearningPostUseCase: CreateLearningPostUseCase);
    createPost(input: CreatePostInput): Promise<ApiResponse<{
        id: string;
    }>>;
    createComment(input: CreateCommentInput): Promise<ApiResponse<{
        id: string;
    }>>;
}
//# sourceMappingURL=LearningRoomController.d.ts.map