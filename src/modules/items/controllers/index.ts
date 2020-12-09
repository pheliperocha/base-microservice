import { Controller } from '../../../app/protocols/controller'
import { itemRepository } from '../repositories'
import { GetItemController } from './getItemController'
import { GetTestController } from './getTestController'

const getItemController = (): Controller => new GetItemController(
  itemRepository()
)

const getTestController = (): Controller => new GetTestController()

export {
  getItemController,
  getTestController
}