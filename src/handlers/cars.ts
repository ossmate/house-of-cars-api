import prisma from '../db'

export const getCars = async (req, res) => {
  const cars = await prisma.car.findMany({
    where: {
      isHighlighted: req.body?.onlyHighlighted,
    },
  })

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

export const deleteCar = async (req, res) => {
  const car = await prisma.car.delete({
    where: {
      id: req.params.id,
    },
  })

  res.json({ data: car })
}

export const updateCar = async (req, res) => {
  const carToUpdate = await prisma.car.findUnique({
    where: {
      id: req.body.id,
    },
  })

  const updatedCar = await prisma.car.update({
    where: {
      id: req.body.id,
    },
    data: {
      brand: req.body.brand || carToUpdate.brand,
      model: req.body.model || carToUpdate.model,
      generation: req.body.generation || carToUpdate.generation,
      engine: req.body.engine || carToUpdate.engine,
      price: req.body.price || carToUpdate.price,
      isHighlighted: req.body.isHighlighted || carToUpdate.isHighlighted,
    },
  })

  res.json({ data: updatedCar })
}
