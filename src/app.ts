import express from 'express';
import * as bodyParser from 'body-parser';
import errorhandler from 'strong-error-handler';
import * as jwt from 'jsonwebtoken'

import { filmsRouter} from './routes/Film';
import { charactersRouter } from './routes/Character';
import { authRouter } from './routes/auth';
import { TOKEN_SECRET } from './config';

export const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json({ limit: '10mb' }))

app.use(authRouter)

// extract jwt
app.use((req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1]

    if (token) {
      res.locals.jwt = jwt.verify(token, TOKEN_SECRET)
    } else {
      res.sendStatus(401)
    }
  } catch (e) {
    next(e)
  }
})

app.use('/characters', charactersRouter)
app.use('/films', filmsRouter)

app.use(errorhandler({ log: true, debug: true }))




