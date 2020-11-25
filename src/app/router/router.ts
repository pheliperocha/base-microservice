import Router from 'koa-router'
import { Context } from 'koa'
import { adaptRoute } from '../adapters/koa/koa-route-adapter'
import { getItemController } from '../../modules/items/controllers'

const router = new Router({
  prefix: '/v1'
})

router.get('/ping', async (ctx: Context) => {
  ctx.body = {
    msg: 'PING',
  }
})

router.get('/item', adaptRoute(getItemController()))

export default router
