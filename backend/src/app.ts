import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import issueRoutes from './routes/issue.route'

import unknownEndpoint from './middlewares/unknown-endpoint'
import errorHandler from './middlewares/error-handler'

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use('/api/issues', issueRoutes)

app.use(unknownEndpoint)
app.use(errorHandler as unknown as express.ErrorRequestHandler)

export default app
