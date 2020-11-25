import { Context } from 'koa'
import { ObjectSchema } from 'joi'
import { StatusCodes } from '../../../utils/codes'
import { Controller } from '../../protocols/controller'
import { HttpRequest } from '../../protocols/http'

export const adaptRoute = (controller: Controller) => {
  return async (ctx: Context): Promise<any> => {
    const httpRequest: HttpRequest = {
      body: Object.assign({ ...ctx.request.body, ...ctx.params }, ctx.request.query),
      headers: ctx.request.headers
    }

    schemaValidation(httpRequest.body, controller.schema)
    const httpResponse = await controller.handle(httpRequest)

    ctx.status = httpResponse.statusCode
    return ctx.body = (httpResponse.statusCode !== StatusCodes.NO_CONTENT) ? httpResponse.body : null
  }
}

const schemaValidation = (data: any, schema: ObjectSchema | null = null) => {
  if (!schema) return
  const errors = schema.validate(data)
  if (errors.error) throw new Error(`Invalid Schema: ${errors.error.message}`)
}