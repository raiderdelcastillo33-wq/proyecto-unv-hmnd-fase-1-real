"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProgressRepository = void 0;
const makeProgressKey = (userId, lessonId) => `${userId}:${lessonId}`;
class InMemoryProgressRepository {
    progressByKey = new Map();
    progressKeysByUser = new Map();
    async upsert(item) {
        const key = makeProgressKey(item.userId, item.lessonId);
        const exists = this.progressByKey.has(key);
        this.progressByKey.set(key, item);
        if (!exists) {
            const userKeys = this.progressKeysByUser.get(item.userId) ?? [];
            userKeys.push(key);
            this.progressKeysByUser.set(item.userId, userKeys);
        }
        return item;
    }
    async findByUserAndLesson(userId, lessonId) {
        return this.progressByKey.get(makeProgressKey(userId, lessonId)) ?? null;
    }
    async listByUser(userId) {
        const userKeys = this.progressKeysByUser.get(userId) ?? [];
        return userKeys
            .map((key) => this.progressByKey.get(key))
            .filter((item) => Boolean(item));
    }
}
exports.InMemoryProgressRepository = InMemoryProgressRepository;
//# sourceMappingURL=InMemoryProgressRepository.js.map