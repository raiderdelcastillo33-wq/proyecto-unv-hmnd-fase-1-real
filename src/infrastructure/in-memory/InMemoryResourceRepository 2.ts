import { Resource } from '../../domain/entities/Resource'
import { ResourceRepository } from '../../domain/repositories/ResourceRepository'

export class InMemoryResourceRepository implements ResourceRepository {
  private resources: Resource[] = []

  async create(resource: Resource): Promise<Resource> {
    this.resources.push(resource)
    return resource
  }

  async listByCategory(category?: Resource['category']): Promise<Resource[]> {
    if (!category) {
      return [...this.resources]
    }

    return this.resources.filter((resource) => resource.category === category)
  }
}
