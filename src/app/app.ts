import Koa from 'koa'
import logger from 'koa-logger'
import json from 'koa-json'
import BodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import router from './router/router'
import errorHandler from './middleware/errorHandler'
import routeNotFound from './middleware/routeNotFound'
import { koaSwagger } from 'koa2-swagger-ui'
import { swaggerOptions } from './router/swagger'
import { defineExchanges } from './pubsub/producer'

const initializeApp = () => {
  const app = new Koa()

  app.use(koaSwagger(swaggerOptions()))

  app.use(json())
  app.use(BodyParser())
  app.use(logger())
  app.use(cors())
  app.use(errorHandler())

  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(routeNotFound())

  defineExchanges()

  return app
}

export default initializeApp