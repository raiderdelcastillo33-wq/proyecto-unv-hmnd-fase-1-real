export interface CreatePostInput {
  userId: string
  title: string
  body: string
}

export interface CreateCommentInput {
  userId: string
  postId: string
  body: string
}
