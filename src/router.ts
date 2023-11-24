import { Router } from 'express'
import { body } from 'express-validator'

import { createCar, deleteCar, getCars, updateCar } from './handlers/cars'
import { inputErrorsHandler } from './middlewares/inputErrorsHandler'
import { createBrand, getBrands } from './handlers/brands'

const router = Router()

router.get('/cars', getCars)

router.post(
  '/cars',
  body('brand').exists().isString(),
  body('model').exists().isString(),
  body('generation').exists().isString(),
  body('engine').exists().isString(),
  body('price').exists().isNumeric(),
  inputErrorsHandler,
  createCar
)

router.delete('/cars/:id', deleteCar)

router.put('/cars', updateCar)

router.get('/brands', getBrands)

router.post(
  '/brands',
  body('name').exists().isString(),
  body('imageUrl').exists().isString(),
  inputErrorsHandler,
  createBrand
)

export default router
