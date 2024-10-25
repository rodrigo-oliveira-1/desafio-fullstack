import { Controller } from '@core/infra/Controller'
import {
  HttpResponseClientError,
  HttpResponseFail,
  HttpResponse,
  HttpResponseNotFound,
  HttpResponseOk,
} from '@core/infra/HttpResponse'
import { GetUser } from './GetUser' 
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'


type GetUserControllerRequest ={ id: string };

export class GetUserController implements Controller {
  constructor(
    private getUserUseCase: GetUser
  ) {}

  async handle(request: GetUserControllerRequest): Promise<HttpResponse> {
    try {
      
      //console.log(request)
      const result = await this.getUserUseCase.execute(request.id)

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case RecordNotFountError:
            return HttpResponseNotFound(error)

          default:
            return HttpResponseClientError(error)
        }
      } else {
        return HttpResponseOk()
      }
    } catch (err) {
      return HttpResponseFail(err)
    }
  }
}
