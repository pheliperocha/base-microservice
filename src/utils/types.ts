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
  NE = 'ne',
  LIKE = 'like',
}

export type Filtered<T> = T & {
  whereField?: string
  whereOperation?: Operator
  whereValue?: string
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export type Sorted<T> = T & {
  orderBy: string
  orderDirection: OrderDirection
}