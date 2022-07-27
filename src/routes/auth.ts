import { Router } from 'express'
import bcryptsjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import { TOKEN_EXPIRING, TOKEN_SECRET, TOKEN_ISSUER } from '../config'

export const authRouter = Router()

authRouter.post('/register', async (req, res, next) => {
  try {
    let { username, password } = req.body
    let salt = await bcryptsjs.genSalt()
    let hash = await bcryptsjs.hash(password, salt)

    let user = await User.create({ username: username, password: hash, salt: salt})
    
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    let { username, password } = req.body
    let user = await User.findOne({ where: { username: username } })
    if (!user) {
      res.sendStatus(404)
    } else {
      if (await bcryptsjs.compare(password, user.password)) {
        var expirationTimeInSeconds = (Date.now() + (Number(TOKEN_EXPIRING) * 100000)) / 1000
        try {
          let token = jwt.sign({ username: user.username }, TOKEN_SECRET, { issuer: TOKEN_ISSUER, algorithm: 'HS512', expiresIn: expirationTimeInSeconds })
          if (token) {
            return res.status(200).json({
              message: 'Auth successful',
              token
            })
          }
        } catch (e) {
          next(e)
        }
      }
    }
  } catch (e) {
    next(e)
  }
})