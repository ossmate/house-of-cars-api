import express from 'express'
import cors from 'cors'

import router from './router'
import { signIn, signUp } from './handlers/user'
import { checkUserExists } from './middlewares/auth'
import { protect } from './modules/auth'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', router)

app.post('/signup', checkUserExists, signUp)

app.post('/signin', signIn)

app.use((err, _req, res, _next) => {
  let statusCode = 500
  let message = 'Something went wrong'

  switch (err.type) {
    case 'auth':
      statusCode = 401
      message = 'Unauthorized'
      break
    case 'input':
      statusCode = 400
      message = 'Invalid input'
      break
  }

  res.status(statusCode).json({ message })
})

export default app
