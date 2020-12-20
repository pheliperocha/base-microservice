import { IItemRepository } from '../itemRepository'
import { ISequelize } from '../../../../app/database/sequelize'
import { GetItemParams } from '../../controllers/getItemController'
import { FindOptions, Op } from 'sequelize'
import { Operator, OrderDirection } from '../../../../utils/types'
import { Item } from '../../types'

export class ItemPostgresRepository implements IItemRepository {
  constructor(private sequelize: ISequelize) { }

  get = async (itemParams: GetItemParams): Promise<Item[]> => {
    const db = this.sequelize()
    const { Item } = db

    const filter = this.getFilter(itemParams)

    return await Item.findAll(filter)
  }

  private getFilter = (itemParams: GetItemParams): FindOptions<Item> => {
    const filter: FindOptions<Item> = {}

    if (itemParams.id) {
      filter.where = {
        id: itemParams.id
      }

      return filter
    }

    const fieldsFilter = this.getFieldsFilter(itemParams, filter)
    const operationFilter = this.getOperationFilter(itemParams, filter)
    const paginationFilter = this.getPaginationFilter(itemParams, filter)

    const fullFilter = { ...fieldsFilter, ...operationFilter, ...paginationFilter }

    if (itemParams.orderBy) {
      fullFilter.order = [[itemParams.orderBy, this.getOrderDirection(itemParams.orderDirection)]]
    }

    return fullFilter
  }

  private mapOperationToSequelizeOp = {
    [Operator.EQ]: Op.eq,
    [Operator.NE]: Op.ne,
    [Operator.GT]: Op.gt,
    [Operator.GTE]: Op.gte,
    [Operator.LT]: Op.lt,
    [Operator.LTE]: Op.lte,
  }

  private getFieldsFilter = (itemParams: GetItemParams, filter: FindOptions<Item>): FindOptions<Item> => {
    if (itemParams.category) {
      filter.where = {
        ...filter.where,
        category: itemParams.category
      }
    }

    if (itemParams.name) {
      filter.where = {
        ...filter.where,
        name: {
          [Op.iLike]: `%${itemParams.name}%`
        }
      }
    }

    return filter
  }

  private getPaginationFilter = (itemParams: GetItemParams, filter: FindOptions<Item>): FindOptions<Item> => {
    if (itemParams.limit) {
      filter.limit = itemParams.limit
    }

    if (itemParams.skip) {
      filter.offset = itemParams.skip
    }

    return filter
  }

  private getOperationFilter = (itemParams: GetItemParams, filter: FindOptions<Item>): FindOptions<Item> => {
    if (itemParams.whereField && itemParams.whereOperation && itemParams.whereValue) {
      const operation = this.mapOperationToSequelizeOp[itemParams.whereOperation]
      filter.where = {
        ...filter.where,
        [itemParams.whereField]: {
          [operation]: (['createdAt', 'updatedAt'].includes(itemParams.whereField)) ? new Date(itemParams.whereValue) : itemParams.whereValue
        }
      }
    }

    return filter
  }

  private getOrderDirection = (orderDirection: OrderDirection) => {
    if (orderDirection === OrderDirection.DESC) {
      return 'DESC'
    }
    return 'ASC'
  }
}