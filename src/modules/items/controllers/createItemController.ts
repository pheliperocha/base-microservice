import Joi from 'joi'
import { Controller } from '../../../app/protocols/controller'
import { HttpRequest, HttpResponse } from '../../../app/protocols/http'
import { StatusCodes } from '../../../utils/codes'
import { IItemRepository } from '../repositories/itemRepository'
import { IItemProducer } from '../services/itemProducer'
import { Category, Item, ItemsOperationsType } from '../types'

export type CreateItemParams = Pick<Item, 'name' | 'category' | 'value'>

export class CreateItemController implements Controller {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly itemProducer: IItemProducer
  ) { }

  schema = Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().valid(...Object.values(Category)).required(),
    value: Joi.number().min(0).max(99999999).required()
  })

  async handle(httpRequest: HttpRequest<CreateItemParams>): Promise<HttpResponse<Item>> {
    const item = await this.itemRepository.create(httpRequest.body)

    this.itemProducer.itemsOperations(ItemsOperationsType.CREATE, item)

    return {
      statusCode: StatusCodes.OK,
      body: item
    }
  }
}
