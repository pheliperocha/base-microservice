import Joi from 'joi'
import { Controller } from '../../../app/protocols/controller'
import { HttpRequest, HttpResponse } from '../../../app/protocols/http'
import { StatusCodes } from '../../../utils/codes'
import { orderSchema, paginationSchema, whereSchema } from '../../../utils/joiSchema'
import { Filtered, Pagineted, Sorted } from '../../../utils/types'
import { IItemRepository } from '../repositories/itemRepository'
import { Category, Item } from '../types'

type DefaultGetItemParams = Partial<Pick<Item, 'id' | 'category' | 'name'>>

export type GetItemParams = Pagineted<Sorted<Filtered<DefaultGetItemParams>>>

export class GetItemController implements Controller {
  constructor(
    private readonly itemRepository: IItemRepository
  ) { }

  schema = Joi.object().keys({
    id: Joi.string(),
    name: Joi.string(),
    category: Joi.alternatives().try(
      Joi.string().valid(...Object.values(Category)),
      Joi.array().items(Joi.string().valid(...Object.values(Category)))
    ),

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
