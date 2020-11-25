import Joi from 'joi'
import { Controller } from '../../../app/protocols/controller'
import { HttpRequest, HttpResponse } from '../../../app/protocols/http'
import { StatusCodes } from '../../../utils/codes'
import { Category, Item } from '../types'

export type GetItemParams = {
  category: Category
}

export class GetItemController implements Controller {
  constructor() { }

  schema = Joi.object().keys({
    category: Joi.string().valid(...Object.values(Category)),
  })

  async handle(httpRequest: HttpRequest<GetItemParams>): Promise<HttpResponse<Item[]>> {
    console.log(httpRequest)
    return {
      statusCode: StatusCodes.OK,
      body: []
    }
  }
}
