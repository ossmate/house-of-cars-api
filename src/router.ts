import { Router } from 'express'
import { createCar, getCars } from './handlers/cars'

const router = Router()

router.get('/cars', getCars)

router.post('/cars', createCar)

export default router
