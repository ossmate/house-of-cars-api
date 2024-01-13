import { Request } from 'express'
import jwt from 'jsonwebtoken'

export const getUserIdFromRequestHeader = (request: Request) => {
  let userId

  if (request.headers.authorization) {
    const [, jwtToken] = request.headers.authorization.split(' ')

    try {
      if (process.env.JWT_SECRET) {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
        userId = decoded.id
      } else {
        console.error('JWT_SECRET is not defined in the environment variables')
      }
    } catch (error) {
      console.error('Error verifying JWT token:', error)
    }
  }

  return userId
}
