import jwt from 'jsonwebtoken'

import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const signUp = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    })

    const token = createJWT(user)

    res.json({ token })
  } catch (error) {
    console.error(error)
  }
}

export const signIn = async (req, res) => {
  const login = req.body.login

  let user = await prisma.user.findUnique({
    where: {
      username: login,
    },
  })

  if (!user) {
    user = await prisma.user.findUnique({
      where: {
        email: login,
      },
    })
  }

  if (!user || !(await comparePasswords(req.body.password, user.password))) {
    res.status(401).json({ message: 'Invalid login credentials' })
    return
  }

  const token = createJWT(user)
  const decodedJwt = jwt.verify(token, process.env.JWT_SECRET)

  res.json({ token, userId: user?.id, iat: decodedJwt.iat })
}
