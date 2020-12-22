import { BaseExchange } from '../../../app/pubsub/declaration'
import { baseProducer } from '../../../app/pubsub/producer'
import { Item, ItemsOperationsType } from '../types'

export interface IItemProducer {
  itemsOperations: (type: ItemsOperationsType, params: Partial<Item> & Pick<Item, 'id'>) => Promise<void>
}

export class ItemProducer implements IItemProducer {
  constructor(private readonly producer: typeof baseProducer) { }

  itemsOperations = async (type: ItemsOperationsType, params: Partial<Item> & Pick<Item, 'id'>): Promise<void> => {
    return this.producer(BaseExchange.ITEMS_OPERATIONS, {
      id: params.id,
      params: params,
      type
    })
  }
}