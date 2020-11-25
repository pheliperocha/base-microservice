import { IItemRepository } from '../itemRepository'
import { ISequelize } from '../../../../app/database/sequelize'

export class ItemPostgresRepository implements IItemRepository {
  constructor(private sequelize: ISequelize) { }

  get = async (): Promise<any[]> => {
    const db = this.sequelize()
    const { Item } = db
    return await Item.findAll()
  }
}