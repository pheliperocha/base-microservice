import { Controller } from '../../../app/protocols/controller'
import { GetItemController } from './getItemController'

const getItemController = (): Controller => new GetItemController()

export {
  getItemController,
}