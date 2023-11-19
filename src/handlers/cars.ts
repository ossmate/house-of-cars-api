import prisma from '../db'

export const getCars = async (req, res) => {
  const cars = await prisma.car.findMany()

  res.json({ data: cars })
}

export const createCar = async (req, res) => {
  const car = await prisma.car.create({
    data: {
      brand: req.body.brand,
      model: req.body.model,
      generation: req.body.generation,
      engine: req.body.engine,
      price: req.body.price,
    },
  })

  res.json({ data: car })
}
