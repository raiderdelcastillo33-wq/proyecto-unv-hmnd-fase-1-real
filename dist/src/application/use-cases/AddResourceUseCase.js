"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResourceUseCase = void 0;
const validators_1 = require("../../shared/utils/validators");
const id_1 = require("../../shared/utils/id");
class AddResourceUseCase {
    resourceRepository;
    constructor(resourceRepository) {
        this.resourceRepository = resourceRepository;
    }
    async execute(input) {
        (0, validators_1.ensureString)(input.title, 'title');
        (0, validators_1.ensureString)(input.description, 'description');
        const normalizedTitle = input.title.trim();
        const normalizedDescription = input.description.trim();
        (0, validators_1.ensureMinLength)(normalizedTitle, 3, 'title');
        (0, validators_1.ensureMinLength)(normalizedDescription, 8, 'description');
        const resource = {
            id: (0, id_1.createId)(),
            title: normalizedTitle,
            category: input.category,
            description: normalizedDescription
        };
        if (typeof input.url === 'string' && input.url.trim().length > 0) {
            resource.url = input.url.trim();
        }
        if (typeof input.content === 'string' && input.content.trim().length > 0) {
            resource.content = input.content.trim();
        }
        return this.resourceRepository.create(resource);
    }
}
exports.AddResourceUseCase = AddResourceUseCase;
//# sourceMappingURL=AddResourceUseCase.js.map