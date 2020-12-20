import { Sequelize, ModelCtor, Model } from 'sequelize'
import { ItemFactory, ItemModel } from '../../modules/items/itemModel'

export enum Models {
  Item = 'Item',
}

export type DbInterface = {
  sequelize: Sequelize
  Sequelize: typeof Sequelize
  Item: ModelCtor<ItemModel>,
}

export type ModelFactory<T extends Model<any, any>> = {
  definition: (sequelize: Sequelize) => ModelCtor<T>,
  association: (db: DbInterface) => Promise<ModelCtor<T>>
}

export interface ISequelize {
  (): DbInterface
}

export const sequelize: ISequelize = (): DbInterface => {
  // TODO: Get from centralize configs
  const { POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT } = process.env

  const sequelize = new Sequelize({
    host: POSTGRES_HOST || 'localhost',
    database: POSTGRES_DATABASE || 'postgres',
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || '123456',
    port: (POSTGRES_PORT) ? +POSTGRES_PORT : 5432,
    dialect: 'postgres',
    logging: sequelizeLog
  })

  const modelDeclaration = getModelDeclaration()
  const db = getDbInteface(modelDeclaration, sequelize)
  associateModels(modelDeclaration, db)
  return db
}

const getModelDeclaration = () => ({
  [Models.Item]: ItemFactory,
})

const getDbInteface = (modelDeclaration: ReturnType<typeof getModelDeclaration>, sequelize: Sequelize): DbInterface => Object.values(Models).reduce((acc: Partial<DbInterface>, modelName: Models) => ({
  ...acc,
  [modelName]: modelDeclaration[modelName].definition(sequelize) as any
}), {
  sequelize,
  Sequelize
}) as DbInterface

const associateModels = (modelDeclaration: ReturnType<typeof getModelDeclaration>, db: DbInterface): any => Object.values(Models).map((modelName: Models) => {
  modelDeclaration[modelName].association(db)
  return modelName
})

const sequelizeLog = (query: string) => {
  // TODO: Get from centralized config
  if (process.env.DISABLE_SEQUELIZE_LOG) return
  console.log('\n\x1b[33m ▶️', query, '\n\x1b[0m')
}