import { CreateItemParams } from '../controllers/createItemController'
import { GetItemParams } from '../controllers/getItemController'
import { Item } from '../types'

export interface IItemRepository {
  get: (itemParams: GetItemParams) => Promise<Item[]>
  create: (itemParams: CreateItemParams) => Promise<Item>
}

export class ItemRepository implements IItemRepository {
  constructor(private readonly operationRepository: IItemRepository) { }

  get = async (itemParams: GetItemParams): Promise<Item[]> => {
    return this.operationRepository.get(itemParams)
  }

  create = async (itemParams: CreateItemParams): Promise<Item> => {
    return this.operationRepository.create(itemParams)
  }
}