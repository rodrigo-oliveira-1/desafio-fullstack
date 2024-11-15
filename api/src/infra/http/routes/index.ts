import { Router } from 'express'

import { usersRouter } from './users.routes'
import { authRouter } from './auth.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/signin', authRouter)

router.use('/healthcheck', (req, res) => {
    res.status(204).json({message: 'server is running with version v1'})
})

export { router }
