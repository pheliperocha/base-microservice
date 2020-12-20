import { Controller } from '../../../app/protocols/controller'
import { itemRepository } from '../repositories'
import { CreateItemController } from './createItemController'
import { GetItemController } from './getItemController'

const getItemController = (): Controller => new GetItemController(
  itemRepository()
)

const createItemController = (): Controller => new CreateItemController(
  itemRepository()
)

export {
  getItemController,
  createItemController
}