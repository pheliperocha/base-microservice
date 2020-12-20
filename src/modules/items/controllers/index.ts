import { Controller } from '../../../app/protocols/controller'
import { itemRepository } from '../repositories'
import { GetItemController } from './getItemController'

const getItemController = (): Controller => new GetItemController(
  itemRepository()
)

export {
  getItemController,
}