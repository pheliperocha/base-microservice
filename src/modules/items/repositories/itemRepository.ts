import { Item } from '../types'

export interface IItemRepository {
  get: () => Promise<Item[]>
}

export class ItemRepository implements IItemRepository {
  constructor(private readonly operationRepository: IItemRepository) { }

  get = async (): Promise<Item[]> => {
    return this.operationRepository.get()
  }
}