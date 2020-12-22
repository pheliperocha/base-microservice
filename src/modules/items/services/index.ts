import { ItemProducer } from './itemProducer'
import { baseProducer } from '../../../app/pubsub/producer'

const itemProducer = () => new ItemProducer(
  baseProducer
)

export {
  itemProducer
}