import Joi from 'joi'
import { Operator, OrderDirection } from './types'

export const paginationSchema = () => ({
  limit: Joi.number().min(0).default(0),
  perPage: Joi.number().min(1).default(10)
})

export const orderSchema = <T>(fields: (keyof T)[] = []) => ({
  orderBy: Joi.string().valid(...fields),
  orderDirection: Joi.string().valid(...Object.values(OrderDirection)).default(OrderDirection.ASC)
})

// TODO: Accept none or the tree params
export const whereSchema = <T>(fields: (keyof T)[] = []) => ({
  whereField: Joi.string().valid(...fields),
  whereOperation: Joi.string().valid(...Object.values(Operator)),
  whereValue: Joi.string()
})