import { LearningComment } from '../../domain/entities/LearningComment'
import { LearningPost } from '../../domain/entities/LearningPost'
import { LearningRoomRepository } from '../../domain/repositories/LearningRoomRepository'

export class InMemoryLearningRoomRepository implements LearningRoomRepository {
  private readonly postsById = new Map<string, LearningPost>()
  private readonly postOrder: string[] = []

  private readonly commentsById = new Map<string, LearningComment>()
  private readonly commentIdsByPost = new Map<string, string[]>()

  async createPost(post: LearningPost): Promise<LearningPost> {
    this.postsById.set(post.id, post)
    this.postOrder.push(post.id)
    return post
  }

  async createComment(comment: LearningComment): Promise<LearningComment> {
    this.commentsById.set(comment.id, comment)

    const commentIds = this.commentIdsByPost.get(comment.postId) ?? []
    commentIds.push(comment.id)
    this.commentIdsByPost.set(comment.postId, commentIds)

    return comment
  }

  async findPostById(postId: string): Promise<LearningPost | null> {
    return this.postsById.get(postId) ?? null
  }

  async listPosts(): Promise<LearningPost[]> {
    const orderedPosts = this.postOrder
      .map((postId) => this.postsById.get(postId))
      .filter((post): post is LearningPost => Boolean(post))

    return orderedPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  async listCommentsByPost(postId: string): Promise<LearningComment[]> {
    const commentIds = this.commentIdsByPost.get(postId) ?? []
    const comments = commentIds
      .map((commentId) => this.commentsById.get(commentId))
      .filter((comment): comment is LearningComment => Boolean(comment))

    return comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }
}
