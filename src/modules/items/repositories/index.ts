import { ItemRepository } from './itemRepository'
import { itemPostgresRepository } from './postgres'

const itemRepository = () => new ItemRepository(
  itemPostgresRepository()
)

export {
  itemRepository
}