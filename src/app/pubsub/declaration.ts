// TODO: Get from Service Declaration Lib
export enum Service {
  BASE = 'base',
  PRETTY = 'pretty',
  EXAMPLE = 'example',
  WORK = 'work'
}

// TODO: Create MS Pubsub declaration lib
export enum BaseTopic {
  ITEM_UPDATE = 'itemUpdate'
}

// TODO: Create MS Pubsub declaration lib
export type ItemUpdateParams = { updateItemId: string }

// TODO: Create MS Pubsub declaration lib
export interface BaseTopicDeclaration {
  [BaseTopic.ITEM_UPDATE]: ItemUpdateParams
}

type Params = BaseTopicDeclaration[BaseTopic.ITEM_UPDATE]
export const itemUpdateHandler = (params: Params) => {
  if (params.updateItemId === 'aaa') throw new Error(`Could not process ${params.updateItemId}`)
  console.log('Update Item Handler', params.updateItemId)
}
