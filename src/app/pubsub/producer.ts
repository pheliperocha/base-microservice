import { createProducer } from 'pubsub'
import { BaseExchange, BaseTopicDeclaration, Service } from './declaration'

// TODO: Get from a centralized config
const { RABBIT_USERNAME, RABBIT_PASSWORD, RABBIT_HOST, RABBIT_BALANCER_SERVICE_HOST, RABBIT_PORT } = process.env

export const { producer: baseProducer, defineExchanges } = createProducer<BaseTopicDeclaration>(Object.values(BaseExchange), {
  serviceName: Service.BASE,
  host: RABBIT_BALANCER_SERVICE_HOST || RABBIT_HOST,
  port: (RABBIT_PORT) ? +RABBIT_PORT : undefined,
  username: RABBIT_USERNAME,
  password: RABBIT_PASSWORD
})