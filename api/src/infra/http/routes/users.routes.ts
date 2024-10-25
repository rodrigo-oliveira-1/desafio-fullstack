import express from 'express'
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'

import { makeCreateUserController, 
         makeGetUserController, 
         makeUpdateUserController } from '../factories/controllers'
//import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const usersRouter = express.Router()

//usersRouterer.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

usersRouter.post('/', adaptRoute(makeCreateUserController()))
usersRouter.put('/:id', adaptRoute(makeUpdateUserController()))
usersRouter.get('/:id', adaptRoute(makeGetUserController()))

export { usersRouter }
