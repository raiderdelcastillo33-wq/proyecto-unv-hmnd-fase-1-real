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
        (0, validators_1.ensureMinLength)(input.title, 3, 'title');
        (0, validators_1.ensureMinLength)(input.description, 8, 'description');
        const resource = {
            id: (0, id_1.createId)(),
            title: input.title,
            category: input.category,
            description: input.description,
            url: input.url,
            content: input.content
        };
        return this.resourceRepository.create(resource);
    }
}
exports.AddResourceUseCase = AddResourceUseCase;
//# sourceMappingURL=AddResourceUseCase.js.map