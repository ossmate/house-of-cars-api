import express from 'express'
import cors from 'cors'

import router from './router'
import { signIn, signUp } from './handlers/user'
import { checkUserExists } from './middlewares/auth'
import { protect } from './modules/auth'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', protect, router)

app.post('/signup', checkUserExists, signUp)

app.post('/signin', signIn)

app.use((err, _req, res, _next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' })
  } else {
    res.status(500).json({ message: 'something went wrong' })
  }
})

export default app
