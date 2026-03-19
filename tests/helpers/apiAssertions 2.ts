import assert from 'node:assert'
import { ApiResponse } from '../../src/shared/types/ApiResponse'

export function ensureSuccess<T>(response: ApiResponse<T>): T {
  assert.equal(response.success, true)
  return (response as Extract<ApiResponse<T>, { success: true }>).data
}

export function ensureFailure<T>(response: ApiResponse<T>, code: string): void {
  assert.equal(response.success, false)
  if (!response.success) {
    assert.equal(response.error.code, code)
  }
}
