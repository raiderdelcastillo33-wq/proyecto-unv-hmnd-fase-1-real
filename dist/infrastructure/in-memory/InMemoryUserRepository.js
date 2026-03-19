"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    users = [];
    async create(user) {
        this.users.push(user);
        return user;
    }
    async findById(id) {
        return this.users.find((user) => user.id === id) ?? null;
    }
    async findByEmail(email) {
        return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=InMemoryUserRepository.js.map