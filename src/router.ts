import { Router } from 'express'
import { body } from 'express-validator'

import { createCar, deleteCar, getCars, updateCar } from './handlers/cars'
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

router.delete('/cars/:id', deleteCar)

router.put('/cars', updateCar)

export default router
