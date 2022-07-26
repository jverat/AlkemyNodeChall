import { Router } from 'express'
import Film from '../models/Film'
import Genre from '../models/Genre'

export const filmsRouter = Router()

// Create new film
filmsRouter.post('', async (req, res, next) => {
  try {
    const film = await Film.create(req.body)
    res.status(201).json(film)
  } catch (e) {
    next(e)
  }
})

// Get every film image, name and premiere date
filmsRouter.get('', async (req, res, next) => {
  try {
    res.json(await Film.findAll({ attributes: ['image', 'name', 'premiere']}))
  } catch (e) {
    next(e)
  }
})

// Get film by id
filmsRouter.get('/:id', async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.params.id)
    res.json(film)
  } catch (e) {
    next(e)
  }
})

// Get film by title
filmsRouter.get('/title=:title', async (req, res, next) => {
  try {
    const film = await Film.findOne({ where: { title: req.params.title }})
    if (film == null) {
      res.status(404).send
    } else {
      res.json(film)
    }
  } catch (e) {
    next(e)
  }
})

// Get films from a specific genre
filmsRouter.get('/genre=:genreId', async (req, res, next) => {
  try {
    const filmsOfGenre = await Genre.findOne({ attributes: ['films'], where: { id: req.params.genreId}})
    if (filmsOfGenre == null) {
      res.status(404).send
    } else {
      res.json(filmsOfGenre)
    }
  } catch (e) {
    next(e)
  }
})

// Get films ordered by premiere date
filmsRouter.get('/order=:order', async (req, res, next) => {
  try {
    if (req.params.order != 'ASC' && req.params.order != 'DESC') {
      res.sendStatus(400)
    } else {
      const films = await Film.findAll({ order: ['premiere', req.params.order] })
      if (films == null) {
        res.status(404).send
      } else {
        res.json(films)
      }
    }
  } catch (e) {
    next(e)
  }
})

filmsRouter.put('/:id', async (req, res, next) => {
  try {
    await Film.update(req.body, { where: { id: req.params.id } })
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

filmsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Film.destroy({ where: { id: req.params.id } })
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

