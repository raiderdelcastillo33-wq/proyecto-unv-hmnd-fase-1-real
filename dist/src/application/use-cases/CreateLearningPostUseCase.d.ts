import { CreateCommentInput, CreatePostInput } from '../dto/LearningRoomDTO';
import { LearningComment } from '../../domain/entities/LearningComment';
import { LearningPost } from '../../domain/entities/LearningPost';
import { LearningRoomRepository } from '../../domain/repositories/LearningRoomRepository';
import { UserRepository } from '../../domain/repositories/UserRepository';
export declare class CreateLearningPostUseCase {
    private readonly userRepository;
    private readonly learningRoomRepository;
    constructor(userRepository: UserRepository, learningRoomRepository: LearningRoomRepository);
    createPost(input: CreatePostInput): Promise<LearningPost>;
    createComment(input: CreateCommentInput): Promise<LearningComment>;
}
//# sourceMappingURL=CreateLearningPostUseCase.d.ts.map