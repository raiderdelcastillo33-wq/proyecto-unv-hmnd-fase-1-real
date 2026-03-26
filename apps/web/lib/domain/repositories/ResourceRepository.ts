import { Resource } from '../entities/Resource'

export interface ResourceRepository {
  listAllResources(): Promise<Resource[]>
}