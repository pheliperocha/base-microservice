import { KoaSwaggerUiOptions } from 'koa2-swagger-ui'
import { StatusCodes, statusCodeToReasonPhrase } from '../../utils/codes'

export const swaggerOptions = (): Partial<KoaSwaggerUiOptions> => ({
  hideTopbar: true,
  swaggerOptions: {
    spec: swaggerSpec(),
  }
})

const swaggerSpec = (): Record<string, unknown> => ({
  swagger: '2.0',
  info: {
    title: 'Base Microservice API',
    description: 'API description in Markdown.',
    version: '1.0.0'
  },
  host: 'localhost',
  basePath: '/base/v1',
  schemes: ['http'],
  paths: {
    '/items': {
      get: {
        summary: 'Returns a list of items.',
        produces: [
          'application/json'
        ],
        responses: {
          [StatusCodes.OK]: { description: statusCodeToReasonPhrase[StatusCodes.OK] }
        }
      }
    }
  }
})