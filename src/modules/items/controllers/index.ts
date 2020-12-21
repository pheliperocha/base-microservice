import { Controller } from '../../../app/protocols/controller'
import { itemRepository } from '../repositories'
import { CreateItemController } from './createItemController'
import { GetItemController } from './getItemController'
import { UpdateItemController } from './updateItemController'

const getItemController = (): Controller => new GetItemController(
  itemRepository()
)

const createItemController = (): Controller => new CreateItemController(
  itemRepository()
)

const updateItemController = (): Controller => new UpdateItemController(
  itemRepository()
)

export {
  getItemController,
  createItemController,
  updateItemController
}