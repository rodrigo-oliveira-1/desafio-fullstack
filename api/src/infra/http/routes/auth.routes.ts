import express from 'express'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'

import { makeSigninUserController } from '../factories/controllers'

const authRouter = express.Router()

authRouter.post('/', adaptRoute(makeSigninUserController()))

export { authRouter }
