import { sequelize } from '../../../../app/database/sequelize'
import { ItemPostgresRepository } from './itemPostgresRepository'

const itemPostgresRepository = () => new ItemPostgresRepository(
  sequelize
)

export {
  itemPostgresRepository
}