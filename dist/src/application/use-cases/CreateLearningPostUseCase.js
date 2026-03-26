"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLearningPostUseCase = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const validators_1 = require("../../shared/utils/validators");
const id_1 = require("../../shared/utils/id");
class CreateLearningPostUseCase {
    userRepository;
    learningRoomRepository;
    constructor(userRepository, learningRoomRepository) {
        this.userRepository = userRepository;
        this.learningRoomRepository = learningRoomRepository;
    }
    async createPost(input) {
        (0, validators_1.ensureString)(input.title, 'title');
        (0, validators_1.ensureString)(input.body, 'body');
        const normalizedTitle = input.title.trim();
        const normalizedBody = input.body.trim();
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new AppError_1.NotFoundError('User not found');
        }
        (0, validators_1.ensureMinLength)(normalizedTitle, 5, 'title');
        (0, validators_1.ensureMinLength)(normalizedBody, 15, 'body');
        const post = {
            id: (0, id_1.createId)(),
            userId: input.userId,
            title: normalizedTitle,
            body: normalizedBody,
            createdAt: new Date()
        };
        return this.learningRoomRepository.createPost(post);
    }
    async createComment(input) {
        (0, validators_1.ensureString)(input.body, 'body');
        const normalizedBody = input.body.trim();
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new AppError_1.NotFoundError('User not found');
        }
        const post = await this.learningRoomRepository.findPostById(input.postId);
        if (!post) {
            throw new AppError_1.NotFoundError('Post not found');
        }
        (0, validators_1.ensureMinLength)(normalizedBody, 3, 'body');
        const comment = {
            id: (0, id_1.createId)(),
            postId: input.postId,
            userId: input.userId,
            body: normalizedBody,
            createdAt: new Date()
        };
        return this.learningRoomRepository.createComment(comment);
    }
}
exports.CreateLearningPostUseCase = CreateLearningPostUseCase;
//# sourceMappingURL=CreateLearningPostUseCase.js.map