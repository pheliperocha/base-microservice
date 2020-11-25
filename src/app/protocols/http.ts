import { StatusCodes } from '../../utils/codes'

export type HttpResponse<T = any> = HttpResponseDefault<T> | HttpResponseNoContent

type HttpResponseDefault<T = any> = {
  statusCode: Exclude<StatusCodes, StatusCodes.NO_CONTENT>
  body: T
}

type HttpResponseNoContent = {
  statusCode: StatusCodes.NO_CONTENT
}

export type HttpRequest<T = any, J = any> = {
  body: T
  headers: J
}
