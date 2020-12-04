import Joi from 'joi'
import { Controller } from '../../../app/protocols/controller'
import { HttpRequest, HttpResponse } from '../../../app/protocols/http'
import { StatusCodes } from '../../../utils/codes'
import { orderSchema, paginationSchema, whereSchema } from '../../../utils/joiSchema'
import { Filtered, Pagineted, Sorted } from '../../../utils/types'
import { IItemRepository } from '../repositories/itemRepository'
import { Category, Item } from '../types'

type DefaultGetItemParams = {
  name?: string
  category?: Category | Category[]
  value?: number
}

export type GetItemParams = Pagineted<Sorted<Filtered<DefaultGetItemParams>>>

export class GetItemController implements Controller {
  constructor(
    private readonly itemRepository: IItemRepository
  ) { }

  schema = Joi.object().keys({
    name: Joi.string(),
    category: Joi.alternatives().try(
      Joi.string().valid(...Object.values(Category)),
      Joi.array().items(Joi.string().valid(...Object.values(Category)))
    ),
    value: Joi.number(),

    ...paginationSchema(),
    ...orderSchema<Item>(['id', 'name', 'value', 'category', 'createdAt', 'updatedAt']),
    ...whereSchema<Item>(['name', 'value', 'category', 'createdAt', 'updatedAt'])
  })

  async handle(httpRequest: HttpRequest<GetItemParams>): Promise<HttpResponse<Item[]>> {
    const items = await this.itemRepository.get(httpRequest.body)
    return {
      statusCode: StatusCodes.OK,
      body: items
    }
  }
}
