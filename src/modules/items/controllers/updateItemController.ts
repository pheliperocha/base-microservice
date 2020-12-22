import Joi from 'joi'
import { Controller } from '../../../app/protocols/controller'
import { HttpRequest, HttpResponse } from '../../../app/protocols/http'
import { StatusCodes } from '../../../utils/codes'
import { IItemRepository } from '../repositories/itemRepository'
import { IItemProducer } from '../services/itemProducer'
import { Category, Item, ItemsOperationsType } from '../types'

export type UpdateItemParams = Pick<Item, 'id'> & Partial<Pick<Item, 'name' | 'category' | 'value'>>

export class UpdateItemController implements Controller {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly itemProducer: IItemProducer
  ) { }

  schema = Joi.object<UpdateItemParams>().keys({
    id: Joi.string().required(),
    name: Joi.string(),
    category: Joi.string().valid(...Object.values(Category)),
    value: Joi.number().min(0).max(99999999),
  }).or('name', 'category', 'value')

  async handle(httpRequest: HttpRequest<UpdateItemParams>): Promise<HttpResponse<Item>> {
    const item = await this.itemRepository.update(httpRequest.body)
    this.itemProducer.itemsOperations(ItemsOperationsType.UPDATE, item)
    return {
      statusCode: StatusCodes.OK,
      body: item
    }
  }
}
