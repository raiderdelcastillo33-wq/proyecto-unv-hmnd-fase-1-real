import { Resource } from '../../domain/entities/Resource';
import { ResourceRepository } from '../../domain/repositories/ResourceRepository';
export declare class InMemoryResourceRepository implements ResourceRepository {
    private resources;
    create(resource: Resource): Promise<Resource>;
    listByCategory(category?: Resource['category']): Promise<Resource[]>;
}
//# sourceMappingURL=InMemoryResourceRepository.d.ts.map