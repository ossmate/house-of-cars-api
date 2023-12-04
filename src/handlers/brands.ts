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

export const updateBrand = async (req, res) => {
  const brandToUpdate = await prisma.brand.findUnique({
    where: {
      id: req.body.id,
    },
  })

  const updatedBrand = await prisma.brand.update({
    where: {
      id: req.body.id,
    },
    data: {
      ...brandToUpdate,
      name: req.body.name || brandToUpdate.name,
      imageUrl: req.body.imageUrl || brandToUpdate.imageUrl,
    },
  })

  res.json({ data: updatedBrand })
}
