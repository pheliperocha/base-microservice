import Koa from 'koa'
import logger from 'koa-logger'
import json from 'koa-json'
import BodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import router from './router/router'

const initializeApp = () => {
  const app = new Koa()

  app.use(json())
  app.use(BodyParser())
  app.use(logger())
  app.use(cors())

  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}

export default initializeApp