import prisma from '../db'

export const getBrands = async (req, res) => {
  const data = await prisma.brand.findMany()

  res.json({ data })
}

export const createBrand = async (req, res) => {
  const data = await prisma.brand.create({
    data: {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
    },
  })

  res.json({ data })
}
