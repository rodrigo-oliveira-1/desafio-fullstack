import cors from 'cors'
import { config } from 'dotenv';
import express from 'express'

console.log(':: HTTP SERVER ::')

config({ path: `.env.${process.env.NODE_ENV}` })

import { router } from './routes' // eslint-disable-line

const app = express()

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  })
)

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  })
)

app.use(router)

export { app }
