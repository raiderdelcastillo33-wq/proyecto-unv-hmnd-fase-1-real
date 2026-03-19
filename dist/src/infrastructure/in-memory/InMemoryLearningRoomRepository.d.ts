import { LearningComment } from '../../domain/entities/LearningComment';
import { LearningPost } from '../../domain/entities/LearningPost';
import { LearningRoomRepository } from '../../domain/repositories/LearningRoomRepository';
export declare class InMemoryLearningRoomRepository implements LearningRoomRepository {
    private readonly postsById;
    private readonly postOrder;
    private readonly commentsById;
    private readonly commentIdsByPost;
    createPost(post: LearningPost): Promise<LearningPost>;
    createComment(comment: LearningComment): Promise<LearningComment>;
    findPostById(postId: string): Promise<LearningPost | null>;
    listPosts(): Promise<LearningPost[]>;
    listCommentsByPost(postId: string): Promise<LearningComment[]>;
}
//# sourceMappingURL=InMemoryLearningRoomRepository.d.ts.map