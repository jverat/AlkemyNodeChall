import { Router, Request, Response, NextFunction } from 'express'
import Character from '../models/Character'
import Film from '../models/Film'

export let charactersRouter = Router()

// Create new character
charactersRouter.post('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const character = await Character.create(req.body)
    res.status(201).json(character)
  } catch (e) {
    next(e)
  }
})
 
// Get every character image and name 
charactersRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Character.findAll({ attributes: ['image', 'name'] }))
  } catch (e) {
    next(e)
  }
})
 
// Get character by id
charactersRouter.get('/:id', async (req, res, next) => {
  try {
    const character = await Character.findByPk(req.params.id)
    if (character == null) {
      res.status(404).send
    } else {
      res.json(character)
    }
  } catch (e) {
    next(e)
  }
})

// Get character by name
charactersRouter.get('/name=:name', async (req, res, next) => {
  try {
    const character = await Character.findOne({ where: { name: req.params.name}})
    if (character == null) {
      res.status(404).send
    } else {
      res.json(character)
    }
  } catch (e) {
    next(e)
  }
})

// Get character by age
charactersRouter.get('/age=:age', async (req, res, next) => {
  try {
    const character = await Character.findAll({ where: { age: req.params.age}})
    if (character == null) {
      res.status(404).send
    } else {
      res.json(character)
    }
  } catch (e) {
    next(e)
  }
})

// Get characters by weight
charactersRouter.get('/weight=:weight', async (req, res, next) => {
  try {
    const character = await Character.findAll({ where: { weight: req.params.weight}})
    if (character == null) {
      res.status(404).send
    } else {
      res.json(character)
    }
  } catch (e) {
    next(e)
  }
})

// Get all characters from film
charactersRouter.get('/film=:filmId', async (req, res, next) => {
  try {
    const character = await Character.findAll({ include: [{ model: Film, where: { id: req.params.filmId }}]})
    if (character == null) {
      res.status(404).send
    } else {
      res.json(character)
    }
  } catch (e) {
    next(e)
  }
})

charactersRouter.put('/:id', async (req, res, next) => {
  try {
    await Character.update(req.body, { where: { id: req.params.id } })
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

charactersRouter.delete('/:id', async (req, res, next) => {
  try {
    await Character.destroy({ where: { id: req.params.id } })
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})


