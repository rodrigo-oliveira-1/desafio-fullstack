import { decode } from 'jsonwebtoken'

import { HttpResponseUnauthorized, HttpResponse, HttpResponseOk } from '@core/infra/HttpResponse'
import { Middleware } from '@core/infra/Middleware'

import { AccessDeniedError } from '../errors/AccessDeniedError'

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string
}

type DecodedJwt = {
  sub: string
}

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      if (accessToken) {
        try {
          const decoded = decode(accessToken) as DecodedJwt

          return HttpResponseOk({ userId: decoded.sub })
        } catch (err) {
          return HttpResponseUnauthorized(new AccessDeniedError())
        }
      }

      return HttpResponseUnauthorized(new AccessDeniedError())
    } catch (error) {
      return fail(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
