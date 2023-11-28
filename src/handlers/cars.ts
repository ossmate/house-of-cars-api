import prisma from '../db'

export const getCars = async (req, res) => {
  const onlyHighlighted = req.query.onlyHighlighted === 'true'

  const cars = await prisma.car.findMany({
    where: {
      isHighlighted: onlyHighlighted,
    },
  })

  res.json({ data: cars })
}

export const getCar = async (req, res) => {
  const car = await prisma.car.findUnique({
    where: {
      id: req.params.id,
    },
  })

  res.json({ data: car })
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
  const cars = await prisma.car.findMany()

  const foundCar = cars.find(({ id }) => id === req.params.id)

  if (!foundCar) {
    return res
      .status(400)
      .json({ message: `Car with id ${req.params.id} not found.` })
  }

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
