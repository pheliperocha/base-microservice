import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { DbInterface, ModelFactory, Models } from '../../app/database/sequelize'
import { Category, Item } from './types'

export type ItemCreationAttributes = Optional<Item, 'id' | 'createdAt' | 'updatedAt'>
export class ItemModel extends Model<Item, ItemCreationAttributes> implements Item {
  public readonly id!: string

  public name!: string
  public category!: Category
  public value!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

const ItemDefinition = (sequelize: Sequelize): ModelCtor<ItemModel> => sequelize.define<ItemModel, ItemCreationAttributes>(Models.Item, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false
  },

  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  freezeTableName: true
})

const ItemAssociation = async (db: DbInterface): Promise<ModelCtor<ItemModel>> => {
  const { Item } = db
  return Item
}

export const ItemFactory: ModelFactory<ItemModel> = {
  definition: ItemDefinition,
  association: ItemAssociation
}