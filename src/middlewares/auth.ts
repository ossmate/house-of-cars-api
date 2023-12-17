import prisma from '../db'

export const checkUserExists = async (req, res, next) => {
  const { email, username } = req.body

  // Check if user with the same email or username already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  })

  if (existingUser) {
    return res
      .status(409)
      .json({ message: 'User with given email or username already exists.' })
  }

  next()
}
