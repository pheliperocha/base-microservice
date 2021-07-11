import { bootstrapServer } from '../bootstrap'
import serverless from 'serverless-http'

exports.handler = async (event: AWSLambda.APIGatewayProxyEvent | AWSLambda.APIGatewayProxyEventV2, context: AWSLambda.Context) => {
  const app = bootstrapServer()
  const handler = serverless(app)
  return handler(event, context)
}
