import { Context } from 'koa'

export default () => async (ctx: Context) => {
  ctx.status = 404
  ctx.body = {
    code: 'ROUTE_NOT_FOUND',
    message: `Route ${ctx.request.url} not found`
  }
}
