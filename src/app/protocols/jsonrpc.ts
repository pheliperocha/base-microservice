export type JsonRpcResponse<T = any> = JsonRpcResponseSuccess<T> | JsonRpcResponseError

export type JsonRpcResponseSuccess<T = any> = {
  jsonrpc: '2.0',
  id?: string | number
  result?: T
}

export type JsonRpcResponseError = {
  jsonrpc: '2.0',
  id?: string | number
  error: {
    code: number,
    message: string
  }
}