export type Pagineted<T> = T & {
  skip?: number,
  limit?: number,
}

export enum Operator {
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  EQ = 'eq',
  NE = 'ne'
}

export type Filtered<T> = T & {
  whereField?: keyof T
  whereOperation?: Operator
  whereValue?: string | number | Date
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export type Sorted<T> = T & {
  orderBy: string
  orderDirection: OrderDirection
}