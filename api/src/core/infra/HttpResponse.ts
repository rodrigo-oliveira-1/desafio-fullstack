export type HttpResponse = {
  statusCode: number
  body: any
}

export function HttpResponseOk<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  }
}

export function HttpResponseCreated(): HttpResponse {
  return {
    statusCode: 201,
    body: undefined,
  }
}

export function HttpResponseClientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  }
}

export function HttpResponseUnauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  }
}

export function HttpResponseForbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  }
}

export function HttpResponseNotFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  }
}

export function HttpResponseConflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: error.message,
    },
  }
}

export function HttpResponseTooMany(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      error: error.message,
    },
  }
}

export function HttpResponseFail(error: Error) {
  console.log(error)

  return {
    statusCode: 500,
    body: {
      error: error.message,
    },
  }
}
