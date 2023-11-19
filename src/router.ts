import { Router } from 'express'
import { body } from 'express-validator'

import { createCar, getCars } from './handlers/cars'
import { inputErrorsHandler } from './middlewares/inputErrorsHandler'

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

export default router
