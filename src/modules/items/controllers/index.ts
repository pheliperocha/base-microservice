import { Controller } from '../../../app/protocols/controller'
import { itemRepository } from '../repositories'
import { itemProducer } from '../services'
import { CreateItemController } from './createItemController'
import { GetItemController } from './getItemController'
import { UpdateItemController } from './updateItemController'

const getItemController = (): Controller => new GetItemController(
  itemRepository()
)

const createItemController = (): Controller => new CreateItemController(
  itemRepository(),
  itemProducer()
)

const updateItemController = (): Controller => new UpdateItemController(
  itemRepository(),
  itemProducer()
)

export {
  getItemController,
  createItemController,
  updateItemController
}