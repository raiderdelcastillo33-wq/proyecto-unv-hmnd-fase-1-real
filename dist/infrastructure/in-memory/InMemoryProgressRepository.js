"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProgressRepository = void 0;
class InMemoryProgressRepository {
    progress = [];
    async upsert(item) {
        const index = this.progress.findIndex((current) => current.userId === item.userId && current.lessonId === item.lessonId);
        if (index === -1) {
            this.progress.push(item);
            return item;
        }
        this.progress[index] = item;
        return item;
    }
    async findByUserAndLesson(userId, lessonId) {
        return this.progress.find((item) => item.userId === userId && item.lessonId === lessonId) ?? null;
    }
    async listByUser(userId) {
        return this.progress.filter((item) => item.userId === userId);
    }
}
exports.InMemoryProgressRepository = InMemoryProgressRepository;
//# sourceMappingURL=InMemoryProgressRepository.js.map