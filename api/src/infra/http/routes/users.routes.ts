import express from 'express'
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'

import { makeCreateUserController, 
         makeGetUserController, 
         makeGetUsersController, 
         makeUpdateUserController,
         makeRemoveUserController } from '../factories/controllers'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const usersRouter = express.Router()

usersRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

usersRouter.post('/', adaptRoute(makeCreateUserController()))
usersRouter.put('/:id', adaptRoute(makeUpdateUserController()))
usersRouter.get('/:id', adaptRoute(makeGetUserController()))
usersRouter.get('/', adaptRoute(makeGetUsersController()))
usersRouter.delete('/:id', adaptRoute(makeRemoveUserController()))

/// TODO:  
///       montar build do front
///       docker compose para subir ambos com tudo certo
///       FRONT
///       MAKE FILE PARA RODAR MIGRATION E FAZER BUILD OU VER OUTRA FORMA MELHOR
export { usersRouter }
