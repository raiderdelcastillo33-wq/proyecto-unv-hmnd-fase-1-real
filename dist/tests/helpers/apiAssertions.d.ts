import { ApiResponse } from '../../src/shared/types/ApiResponse';
export declare function ensureSuccess<T>(response: ApiResponse<T>): T;
export declare function ensureFailure<T>(response: ApiResponse<T>, code: string): void;
//# sourceMappingURL=apiAssertions.d.ts.map