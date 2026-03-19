"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryResourceRepository = void 0;
class InMemoryResourceRepository {
    resources = [];
    async create(resource) {
        this.resources.push(resource);
        return resource;
    }
    async listByCategory(category) {
        if (!category) {
            return [...this.resources];
        }
        return this.resources.filter((resource) => resource.category === category);
    }
}
exports.InMemoryResourceRepository = InMemoryResourceRepository;
//# sourceMappingURL=InMemoryResourceRepository.js.map