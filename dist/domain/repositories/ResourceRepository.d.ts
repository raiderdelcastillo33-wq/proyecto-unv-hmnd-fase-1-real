import { Resource } from '../entities/Resource';
export interface ResourceRepository {
    create(resource: Resource): Promise<Resource>;
    listByCategory(category?: Resource['category']): Promise<Resource[]>;
}
//# sourceMappingURL=ResourceRepository.d.ts.map