import prisma from '../db'

export const getFavorites = async (req, res) => {
  const data = await prisma.favorite.findMany({
    where: {
      userId: req.params.id,
    },
  })

  console.log(data, 'data')

  res.json({ data })
}
