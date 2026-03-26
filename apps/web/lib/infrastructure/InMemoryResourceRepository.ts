import { Resource } from '../domain/entities/Resource'
import { ResourceRepository } from '../domain/repositories/ResourceRepository'

export class InMemoryResourceRepository implements ResourceRepository {
  private resources: Resource[] = [
    {
      id: 'resource-1',
      title: 'Guía de HTML Básico',
      category: 'tutoriales'
    },
    {
      id: 'resource-2',
      title: 'Herramientas de IA para Desarrollo',
      category: 'herramientas'
    }
  ]

  async listAllResources(): Promise<Resource[]> {
    return this.resources
  }
}