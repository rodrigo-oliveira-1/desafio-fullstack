import { Controller } from '@core/infra/Controller'
import {
  HttpResponseClientError,
  HttpResponseFail,
  HttpResponse,
  HttpResponseOk,
} from '@core/infra/HttpResponse'
import { GetUsers } from './GetUsers' 

type GetUserControllerRequest = any;

export class GetUsersController implements Controller {
  constructor(
    private getUserUseCase: GetUsers
  ) {}

  async handle(request: GetUserControllerRequest): Promise<HttpResponse> {
    try {
      
      const result = await this.getUserUseCase.execute()

      if (result.isLeft()) {
        const error = result.value
        return HttpResponseClientError(error)
      } else {
        return HttpResponseOk(result.value)
      }
    } catch (err) {
      return HttpResponseFail(err)
    }
  }
}
