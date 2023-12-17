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
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from './handlers/brands'
import { protect } from './modules/auth'

const router = Router()

router.get('/cars', getCars)

router.get('/cars/:id', getCar)

router.post(
  '/cars',
  protect,
  body('brandId').exists().isString(),
  body('model').exists().isString(),
  body('generation').exists().isString(),
  body('engine').exists().isString(),
  body('price').exists().isNumeric(),
  body('isHighlighted').isBoolean().default(false),
  body('imageUrl').isString().default(''),
  inputErrorsHandler,
  createCar
)

router.delete('/cars/:id', protect, deleteCar)

router.put('/cars', protect, updateCar)

router.get('/brands', getBrands)

router.post(
  '/brands',
  protect,
  body('name').exists().isString(),
  body('imageUrl').exists().isString(),
  inputErrorsHandler,
  createBrand
)

router.put('/brands', protect, updateBrand)

router.delete('/brands/:id', protect, deleteBrand)

export default router
