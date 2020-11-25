import Router from 'koa-router'
import { Context } from 'koa'

const router = new Router({
  prefix: '/v1'
})

router.get('/ping', async (ctx: Context) => {
  ctx.body = {
    msg: 'PING',
  }
})

export default router
