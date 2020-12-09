import { createConsumer, createProducer } from 'pubsub'
import { getTestController } from '../../modules/items/controllers'
import { adaptAmqpHandler } from '../adapters/amqp/amqp-handler-adapter'
import { BaseTopic, BaseTopicDeclaration, Service } from './declaration'

const { RABBIT_USERNAME, RABBIT_PASSWORD, RABBIT_HOST, RABBIT_PORT } = process.env

export const baseProducer = createProducer<BaseTopicDeclaration>({
  serviceName: Service.BASE,
  host: RABBIT_HOST,
  port: (RABBIT_PORT) ? +RABBIT_PORT : undefined,
  username: RABBIT_USERNAME,
  password: RABBIT_PASSWORD
})

export const baseConsumer = createConsumer<BaseTopicDeclaration>({
  [BaseTopic.ITEM_UPDATE]: adaptAmqpHandler(getTestController()),
}, {
  serviceName: Service.PRETTY,
  exchangeService: Service.BASE,
  host: RABBIT_HOST,
  port: (RABBIT_PORT) ? +RABBIT_PORT : undefined,
  username: RABBIT_USERNAME,
  password: RABBIT_PASSWORD
})
