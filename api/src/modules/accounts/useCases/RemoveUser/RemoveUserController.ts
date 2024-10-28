import { Controller } from '@core/infra/Controller'
import { 
  HttpResponseFail,
  HttpResponse,
  HttpResponseNotFound,
  HttpResponseOk,
} from '@core/infra/HttpResponse'
import { RemoveUser } from './RemoveUser' 


type RemoveUserControllerRequest = { id: string, userId: string };

export class RemoveUserController implements Controller {
  constructor(
    private updateUserUseCase: RemoveUser
  ) {}

  async handle(request: RemoveUserControllerRequest): Promise<HttpResponse> {
    try {
      //console.log(request)
      await this.updateUserUseCase.execute(request)

      return HttpResponseOk()
      
    } catch (err) {
      return HttpResponseFail(err)
    }
  }
}
