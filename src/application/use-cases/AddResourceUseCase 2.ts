import { Resource } from '../../domain/entities/Resource'
import { ResourceRepository } from '../../domain/repositories/ResourceRepository'
import { ensureMinLength, ensureString } from '../../shared/utils/validators'
import { createId } from '../../shared/utils/id'

export interface AddResourceInput {
  title: string
  category: Resource['category']
  description: string
  url?: string
  content?: string
}

export class AddResourceUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(input: AddResourceInput): Promise<Resource> {
    ensureString(input.title, 'title')
    ensureString(input.description, 'description')

    const normalizedTitle = input.title.trim()
    const normalizedDescription = input.description.trim()

    ensureMinLength(normalizedTitle, 3, 'title')
    ensureMinLength(normalizedDescription, 8, 'description')

    const resource: Resource = {
      id: createId(),
      title: normalizedTitle,
      category: input.category,
      description: normalizedDescription
    }

    if (typeof input.url === 'string' && input.url.trim().length > 0) {
      resource.url = input.url.trim()
    }

    if (typeof input.content === 'string' && input.content.trim().length > 0) {
      resource.content = input.content.trim()
    }

    return this.resourceRepository.create(resource)
  }
}
