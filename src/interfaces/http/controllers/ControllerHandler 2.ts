import { ApiResponse, failure, success } from '../../../shared/types/ApiResponse'

export async function handleController<T>(operation: () => Promise<T>): Promise<ApiResponse<T>> {
  try {
    const result = await operation()
    return success(result)
  } catch (error) {
    return failure(error)
  }
}
