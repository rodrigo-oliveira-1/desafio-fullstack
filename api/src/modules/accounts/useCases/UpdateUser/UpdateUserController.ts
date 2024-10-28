import { Controller } from '@core/infra/Controller'
import {
  HttpResponseClientError,
  HttpResponseFail,
  HttpResponse,
  HttpResponseNotFound,
  HttpResponseOk,
} from '@core/infra/HttpResponse'
import { UpdateUser } from './UpdateUser' 
import { UpdateUserRequestDto } from '@modules/accounts/dto/user.dto'
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'


type UpdateUserControllerRequest = UpdateUserRequestDto & { userId: string };

export class UpdateUserController implements Controller {
  constructor(
    private updateUserUseCase: UpdateUser
  ) {}

  async handle(request: UpdateUserControllerRequest): Promise<HttpResponse> {
    try {
      
      const { userId, ...userRequestData } = request
      //console.log(request)
      userRequestData.updatedBy = userId;
      const result = await this.updateUserUseCase.execute(userRequestData)

      if (result.isLeft()) {
        const error = result.value
        console.log(error)
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
