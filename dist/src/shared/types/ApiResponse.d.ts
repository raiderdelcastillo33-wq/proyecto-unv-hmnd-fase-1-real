export interface ApiSuccess<T> {
    success: true;
    data: T;
}
export interface ApiFailure {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, string>;
    };
}
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
export declare function success<T>(data: T): ApiSuccess<T>;
export declare function failure(error: unknown): ApiFailure;
//# sourceMappingURL=ApiResponse.d.ts.map