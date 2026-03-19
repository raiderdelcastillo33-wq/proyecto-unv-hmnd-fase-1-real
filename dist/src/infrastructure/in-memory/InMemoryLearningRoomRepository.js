"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryLearningRoomRepository = void 0;
class InMemoryLearningRoomRepository {
    postsById = new Map();
    postOrder = [];
    commentsById = new Map();
    commentIdsByPost = new Map();
    async createPost(post) {
        this.postsById.set(post.id, post);
        this.postOrder.push(post.id);
        return post;
    }
    async createComment(comment) {
        this.commentsById.set(comment.id, comment);
        const commentIds = this.commentIdsByPost.get(comment.postId) ?? [];
        commentIds.push(comment.id);
        this.commentIdsByPost.set(comment.postId, commentIds);
        return comment;
    }
    async findPostById(postId) {
        return this.postsById.get(postId) ?? null;
    }
    async listPosts() {
        const orderedPosts = this.postOrder
            .map((postId) => this.postsById.get(postId))
            .filter((post) => Boolean(post));
        return orderedPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    async listCommentsByPost(postId) {
        const commentIds = this.commentIdsByPost.get(postId) ?? [];
        const comments = commentIds
            .map((commentId) => this.commentsById.get(commentId))
            .filter((comment) => Boolean(comment));
        return comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}
exports.InMemoryLearningRoomRepository = InMemoryLearningRoomRepository;
//# sourceMappingURL=InMemoryLearningRoomRepository.js.map