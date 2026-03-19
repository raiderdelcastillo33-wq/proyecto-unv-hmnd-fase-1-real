"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryLearningRoomRepository = void 0;
class InMemoryLearningRoomRepository {
    posts = [];
    comments = [];
    async createPost(post) {
        this.posts.push(post);
        return post;
    }
    async createComment(comment) {
        this.comments.push(comment);
        return comment;
    }
    async findPostById(postId) {
        return this.posts.find((post) => post.id === postId) ?? null;
    }
    async listPosts() {
        return [...this.posts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    async listCommentsByPost(postId) {
        return this.comments
            .filter((comment) => comment.postId === postId)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}
exports.InMemoryLearningRoomRepository = InMemoryLearningRoomRepository;
//# sourceMappingURL=InMemoryLearningRoomRepository.js.map