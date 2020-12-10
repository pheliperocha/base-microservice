import { Server } from 'jayson'
import Joi from 'joi'
import { Context, Request } from 'koa'
import { mapJsonRpcErrorToHttpStatusCode, StatusCodes, statusCodeToReasonPhrase } from '../../utils/codes'
import { JsonRpcResponse, JsonRpcResponseError, JsonRpcResponseSuccess } from '../protocols/jsonrpc'

export default (server: Server) => {
  return async (ctx: Context) => {
    if (!isMethod(ctx.request, 'POST')) {
      getResponse(ctx, StatusCodes.METHOD_NOT_ALLOWED)
      return
    }

    if (!isContentType(ctx.request, 'application/json')) {
      getResponse(ctx, StatusCodes.UNSUPPORTED_MEDIA_TYPE)
      return
    }
    
    if (!ctx.request.body || typeof (ctx.request.body) !== 'object' || !isValidSchema(ctx.request.body)) {
      getResponse(ctx, StatusCodes.UNPROCESSABLE_ENTITY)
      return
    }

    server.call(ctx.request.body, ctx, handler(ctx))
  }
}

const handler: any = (ctx: Context) => (errResponse?: JsonRpcResponseError | null, result?: JsonRpcResponseSuccess) => {
  if (errResponse) {
    console.log(errResponse)
    ctx.status = mapJsonRpcErrorToHttpStatusCode(errResponse.error.code)
    ctx.body = errResponse
    return
  }
  ctx.body = result
  return
}

const getResponse = (ctx: Context, statusCode: StatusCodes): Context => {
  ctx.status = statusCode
  ctx.body = {
    code: StatusCodes[statusCode],
    message: statusCodeToReasonPhrase[statusCode]
  }
  return ctx
}

const isMethod = (request: Request, method: string) => {
  method = (method || '').toUpperCase()
  return (request.method || '') === method
}

const isContentType = (request: Request, type: string) => {
  request = request || { headers: {} }
  const contentType = request.headers['content-type'] || ''
  return RegExp(type, 'i').test(contentType)
}

const isValidSchema = (data: JsonRpcResponse): boolean => {
  const schema = Joi.object().keys({
    jsonrpc: Joi.string().valid('2.0').required(),
    id: Joi.alternatives(Joi.string().alphanum(), Joi.number()),
    method: Joi.string().required(),
    params: Joi.alternatives(Joi.object(), Joi.array(), Joi.number(), Joi.string())
  })

  const errors = schema.validate(data)
  if (errors.error) {
    console.log(errors)
    return false
  }
  return true
}
