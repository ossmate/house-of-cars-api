import prisma from '../db'
import { getUserIdFromRequestHeader } from '../helpers/getUserIdFromReuqestHeder/getUserIdFromRequestHeader'

interface WhereClause {
  isHighlighted?: boolean
  brandId?: string
}

export const getCars = async (req, res) => {
  const onlyHighlightedParam = req.query.onlyHighlighted
  const userId = getUserIdFromRequestHeader(req)

  let favoriteCarIds = []
  let whereClause: WhereClause = {}

  if (onlyHighlightedParam === 'true' || onlyHighlightedParam === 'false') {
    whereClause.isHighlighted = onlyHighlightedParam === 'true'
  }

  if (req.query.brandId) {
    whereClause.brandId = req.query.brandId
  }

  const cars = await prisma.car.findMany({
    where: whereClause,
    include: {
      brand: true,
    },
  })

  if (userId) {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      select: {
        carId: true,
      },
    })
    favoriteCarIds = favorites.map((favorite) => favorite.carId)
  }

  const data = cars.map((car) => {
    return userId
      ? { ...car, isFavorite: favoriteCarIds.includes(car.id) }
      : car
  })

  res.json({ data })
}

export const getCar = async (req, res) => {
  const userId = getUserIdFromRequestHeader(req)
  let isFavorite = false

  if (userId) {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_carId: {
          userId,
          carId: req.params.id,
        },
      },
    })
    isFavorite = !!favorite
  }

  const car = await prisma.car.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      brand: true,
    },
  })

  if (!car) {
    return res.status(404).json({ message: 'Car not found' })
  }

  res.json({ data: { ...car, isFavorite: isFavorite } })
}

export const createCar = async (req, res) => {
  const car = await prisma.car.create({
    data: {
      brandId: req.body.brandId,
      model: req.body.model,
      generation: req.body.generation,
      engine: req.body.engine,
      price: req.body.price,
      isHighlighted: req.body.isHighlighted,
      imageUrl: req.body.imageUrl,
      belongsToId: req.body.belongsToId,
    },
    include: {
      brand: true,
    },
  })

  res.json({ data: car })
}

export const deleteCar = async (req, res) => {
  const carId = req.params.id

  const foundCar = await prisma.car.findUnique({
    where: {
      id: req.params.id,
    },
  })

  if (!foundCar) {
    return res
      .status(400)
      .json({ message: `Car with id ${req.params.id} not found.` })
  }

  await prisma.favorite.deleteMany({
    where: { carId },
  })

  const car = await prisma.car.delete({
    where: {
      id: carId,
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
      brand: req.body.brand || carToUpdate.brandId,
      model: req.body.model || carToUpdate.model,
      generation: req.body.generation || carToUpdate.generation,
      engine: req.body.engine || carToUpdate.engine,
      price: req.body.price || carToUpdate.price,
      isHighlighted: req.body.isHighlighted || carToUpdate.isHighlighted,
      imageUrl: req.body.imageUrl || carToUpdate.imageUrl,
    },
  })

  res.json({ data: updatedCar })
}
