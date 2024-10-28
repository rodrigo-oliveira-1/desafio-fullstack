import cors from 'cors'
import { config } from 'dotenv';
import express from 'express'

if (process.env.NODE_ENV === 'production') {
  config({ path: `/home/node/app/.env.${process.env.NODE_ENV}` })  
  //console.log(process.env)
} else {
  config({ path: `.env.${process.env.NODE_ENV}` })
}

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
