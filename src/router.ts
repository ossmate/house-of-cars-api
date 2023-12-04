import { Router } from 'express'
import { body } from 'express-validator'

import {
  createCar,
  deleteCar,
  getCar,
  getCars,
  updateCar,
} from './handlers/cars'
import { inputErrorsHandler } from './middlewares/inputErrorsHandler'
import { createBrand, getBrands, updateBrand } from './handlers/brands'

const router = Router()

router.get('/cars', getCars)

router.get('/cars/:id', getCar)

router.post(
  '/cars',
  body('brandId').exists().isString(),
  body('model').exists().isString(),
  body('generation').exists().isString(),
  body('engine').exists().isString(),
  body('price').exists().isNumeric(),
  body('isHighlighted').isBoolean().default(false),
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

router.put('/brands', updateBrand)

export default router
