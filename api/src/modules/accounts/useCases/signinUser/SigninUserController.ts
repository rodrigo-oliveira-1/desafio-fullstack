import { Controller } from '@core/infra/Controller'
import {
  HttpResponseClientError,
  HttpResponseFail,
  HttpResponse,  
  HttpResponseOk,
} from '@core/infra/HttpResponse'
import { SigninUser } from './SigninUser' 
import { AccountSigninNotFoundError } from './error/AccountSigninNotFoundError'; 


type SigninUserControllerRequest ={ userEmail: string, userPass: string };

export class SigninUserController implements Controller {
  constructor(
    private signinUserUseCase: SigninUser
  ) {}

  async handle(request: SigninUserControllerRequest): Promise<HttpResponse> {
    try {
      
      //console.log(request)
      const result = await this.signinUserUseCase.execute(request.userEmail, request.userPass)

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case AccountSigninNotFoundError:
            return HttpResponseClientError(error)

          default:
            return HttpResponseClientError(error)
        }
      } else {
        return HttpResponseOk(result.value)
      }
    } catch (err) {
      return HttpResponseFail(err)
    }
  }
}
