import { ObjectSchema } from 'joi'
import { Controller } from '../../protocols/controller'
import { HttpRequest } from '../../protocols/http'
import { IParsedConsumeMessage } from 'pubsub'
import { StatusCodes, statusCodeToReasonPhrase } from '../../../utils/codes'
import { log } from '../../../utils/logger'

export const adaptAmqpHandler = (controller: Controller) => {
  return async (msg: IParsedConsumeMessage): Promise<any> => { // TODO: msg interface
    try {
      const httpRequest: HttpRequest = {
        body: msg.content,
        headers: msg.properties.headers
      }

      schemaValidation(httpRequest.body, controller.schema)
      const httpResponse = await controller.handle(httpRequest)

      // TODO: Validate HttpResponse
      console.log(httpResponse)

      return
    } catch (err) {
      // TODO: Extract Amqp Error Handler
      const body = {
        code: err.code || StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
        message: err.message || statusCodeToReasonPhrase[StatusCodes.INTERNAL_SERVER_ERROR]
      }
      log.error(`${body.code} | ${body.message}`)
      throw err
    }
  }
}

const schemaValidation = (data: any, schema: ObjectSchema | null = null) => {
  if (!schema) return
  const errors = schema.validate(data)
  if (errors.error) throw new Error(`Invalid Schema: ${errors.error.message}`)
}