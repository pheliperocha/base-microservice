import { Context, Next } from 'koa'
import { StatusCodes, statusCodeToReasonPhrase } from '../../utils/codes'
import { log } from '../../utils/logger'

export default () => async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    ctx.body = {
      code: err.code || StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
      message: err.message || statusCodeToReasonPhrase[StatusCodes.INTERNAL_SERVER_ERROR]
    }
    log.error(err.message)
    ctx.app.emit('error', err, ctx)
  }
}
