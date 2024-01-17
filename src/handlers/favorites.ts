import prisma from '../db'

export const getFavoriteCars = async (req, res) => {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: req.params.userId,
    },
    select: {
      carId: true,
    },
  })

  const carIds = favorites.map((favorite) => favorite.carId)

  const cars = await Promise.all(
    carIds.map((carId) =>
      prisma.car.findUnique({
        where: { id: carId },
        include: { brand: true },
      })
    )
  )

  const validCars = cars
    .filter((car) => car !== null)
    .map((car) => ({
      ...car,
      isFavorite: true,
    }))

  res.json({ data: validCars })
}

export const addToFavorites = async (req, res) => {
  const userId = req.body.userId
  const foundCar = await prisma.car.findUnique({
    where: {
      id: req.body.carId,
    },
  })

  if (!foundCar) {
    return res
      .status(404)
      .json({ message: `Car with id ${req.params.id} not found.` })
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_carId: {
        userId: userId,
        carId: foundCar.id,
      },
    },
  })

  if (existingFavorite) {
    return res
      .status(409)
      .json({ message: 'This car is already in your favorites.' })
  }

  const newFavorite = await prisma.favorite.create({
    data: {
      userId: userId,
      carId: foundCar.id,
    },
  })

  return res.status(200).json(newFavorite)
}

export const removeFromFavorites = async (req, res) => {
  const userId = req.body.userId
  const foundCar = await prisma.car.findUnique({
    where: {
      id: req.body.carId,
    },
  })

  if (!foundCar) {
    return res
      .status(404)
      .json({ message: `Car with id ${req.params.id} not found.` })
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_carId: {
        userId: userId,
        carId: foundCar.id,
      },
    },
  })

  if (!existingFavorite) {
    return res
      .status(409)
      .json({ message: 'This car is already in your favorites.' })
  }

  const removedFavorite = await prisma.favorite.delete({
    where: {
      userId_carId: {
        userId: userId,
        carId: foundCar.id,
      },
    },
  })

  return res.status(200).json(removedFavorite)
}
