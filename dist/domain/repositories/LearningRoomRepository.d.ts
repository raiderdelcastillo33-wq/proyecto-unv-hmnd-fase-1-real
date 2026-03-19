import { LearningComment } from '../entities/LearningComment';
import { LearningPost } from '../entities/LearningPost';
export interface LearningRoomRepository {
    createPost(post: LearningPost): Promise<LearningPost>;
    createComment(comment: LearningComment): Promise<LearningComment>;
    findPostById(postId: string): Promise<LearningPost | null>;
    listPosts(): Promise<LearningPost[]>;
    listCommentsByPost(postId: string): Promise<LearningComment[]>;
}
//# sourceMappingURL=LearningRoomRepository.d.ts.map