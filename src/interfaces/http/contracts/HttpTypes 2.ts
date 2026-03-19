export interface HttpRequest<TBody = unknown, TParams = Record<string, string>> {
  body: TBody
  params: TParams
}

export interface HttpRoute<TBody = unknown, TParams = Record<string, string>> {
  method: 'GET' | 'POST'
  path: string
  handler: (request: HttpRequest<TBody, TParams>) => Promise<unknown>
}
