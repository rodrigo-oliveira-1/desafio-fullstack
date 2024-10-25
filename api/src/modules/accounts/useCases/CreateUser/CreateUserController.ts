import { Controller } from '@core/infra/Controller'
import {
  HttpResponseClientError,
  HttpResponseConflict,
  HttpResponseCreated,
  HttpResponseFail,
  HttpResponse,
} from '@core/infra/HttpResponse'
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError'
import { CreateUser } from './CreateUser' 
import { createUserRequestDto } from '@modules/accounts/dto/user.dto'


type CreateUserControllerRequest = createUserRequestDto & { userId: string };

export class CreateUserController implements Controller {
  constructor(
    private createUserUseCase: CreateUser
  ) {}

  async handle(request: CreateUserControllerRequest): Promise<HttpResponse> {
    try {
      
      const { userId, ...userRequestData } = request
      //console.log(request)
      userRequestData.createdBy = userId;
      const result = await this.createUserUseCase.execute(userRequestData)

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case AccountAlreadyExistsError:
            return HttpResponseConflict(error)

          default:
            return HttpResponseClientError(error)
        }
      } else {
        return HttpResponseCreated()
      }
    } catch (err) {
      return HttpResponseFail(err)
    }
  }
}
