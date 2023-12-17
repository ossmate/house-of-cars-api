import express from 'express'
import cors from 'cors'

import router from './router'
import { signIn, signUp } from './handlers/user'
import { checkUserExists } from './middlewares/auth'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', router)

app.post('/signup', checkUserExists, signUp)

app.post('/signin', signIn)

export default app
