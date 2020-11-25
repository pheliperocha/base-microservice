import { HttpResponse, HttpRequest } from './http'
import { ObjectSchema } from 'joi'

export interface Controller {
  schema?: ObjectSchema
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
