import { Controller } from '../../../app/protocols/controller'
import { HttpRequest, HttpResponse } from '../../../app/protocols/http'
import { ItemUpdateParams } from '../../../app/pubsub/declaration'
import { StatusCodes } from '../../../utils/codes'

export class GetTestController implements Controller {
  constructor() {}

  async handle(httpRequest: HttpRequest<ItemUpdateParams>): Promise<HttpResponse<any>> {
    return {
      statusCode: StatusCodes.OK,
      body: httpRequest.body.updateItemId
    }
  }
}
