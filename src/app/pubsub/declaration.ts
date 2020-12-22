// TODO: Get from Service Declaration Lib
export enum Service {
  BASE = 'base'
}

// TODO: Create MS Pubsub declaration lib
export enum BaseExchange {
  ITEMS_OPERATIONS = 'itemsOperations',
}

// TODO: Create MS Pubsub declaration lib
export type ItemsOperationsParams = {
  id: string,
  type: 'create' | 'update' | 'delete',
  params: any,
}

// TODO: Create MS Pubsub declaration lib
export interface BaseTopicDeclaration {
  [BaseExchange.ITEMS_OPERATIONS]: ItemsOperationsParams,
}
