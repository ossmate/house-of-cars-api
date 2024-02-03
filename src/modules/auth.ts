import jwt from 'jsonwebtoken'
import bcrytp from 'bcrypt'

export const comparePasswords = (password, hashedPassword) => {
  return bcrytp.compare(password, hashedPassword)
}

export const hashPassword = (password) => {
  return bcrytp.hash(password, 5)
}

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return token
}

export const protect = (req, res, next) => {
  const bearerHeader = req.headers.authorization

  // Check if the bearer token is not present
  if (!bearerHeader) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  // Extract the token
  const token = bearerHeader.split(' ')[1]

  // Validate the extracted token
  if (!token) {
    return res.status(401).json({ message: 'Not valid token' })
  }

  try {
    // Verify the token and add the user to the request
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedUser
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Not valid token' })
  }
}
