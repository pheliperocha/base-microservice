import { IItemRepository } from '../itemRepository'
import { ISequelize } from '../../../../app/database/sequelize'
import { GetItemParams } from '../../controllers/getItemController'
import { FindOptions, Op } from 'sequelize/types'
import { OrderDirection } from '../../../../utils/types'
import { Item } from '../../types'

export class ItemPostgresRepository implements IItemRepository {
  constructor(private sequelize: ISequelize) { }

  get = async (itemParams: GetItemParams): Promise<Item[]> => {
    const db = this.sequelize()
    const { Item } = db

    const filter: FindOptions<Item> = {}

    if (itemParams.limit) {
      filter.limit = itemParams.limit
    }

    if (itemParams.skip) {
      filter.offset = itemParams.skip
    }

    if (itemParams.limit) {
      filter.limit = itemParams.limit
    }

    if (itemParams.orderBy) {
      filter.order = [[itemParams.orderBy, this.getOrderDirection(itemParams.orderDirection)]]
    }

    if (itemParams.name) {
      filter.where = {
        name: {
          [Op.like]: `%${itemParams.name}%`
        }
      }
    }

    return await Item.findAll(filter)
  }

  private getOrderDirection = (orderDirection: OrderDirection) => {
    if (orderDirection === OrderDirection.DESC) {
      return 'DESC'
    }
    return 'ASC'
  }
}