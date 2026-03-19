import { Resource } from '../../domain/entities/Resource';
import { ResourceRepository } from '../../domain/repositories/ResourceRepository';
export interface AddResourceInput {
    title: string;
    category: Resource['category'];
    description: string;
    url?: string;
    content?: string;
}
export declare class AddResourceUseCase {
    private readonly resourceRepository;
    constructor(resourceRepository: ResourceRepository);
    execute(input: AddResourceInput): Promise<Resource>;
}
//# sourceMappingURL=AddResourceUseCase.d.ts.map