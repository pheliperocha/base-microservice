export type Item = {
  id: string
  name: string
  category: Category
  value: number
  createdAt: Date
  updatedAt: Date
}

export enum Category {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
}

export enum ItemsOperationsType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}