import prisma from '../db'

export const getBrands = async (req, res) => {
  const brands = await prisma.brand.findMany()

  res.json({ data: brands })
}

export const createBrand = async (req, res) => {
  const brand = await prisma.brand.create({
    data: {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
    },
  })

  res.json({ data: brand })
}
