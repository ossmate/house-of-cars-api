import { validationResult } from 'express-validator'

export const inputErrorsHandler = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400)

    res.json({ errors: errors.array() })
    return
  } else {
    next()
  }
}
