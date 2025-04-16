import * as serviceExercise from './service.js'
import { ErrorHandler } from '../util/ErrorHandler.js'

// GET todos os exercícios
export const findAll = async (req, res) => {
    try {
        const exercise = await serviceExercise.findAll()
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

// GET exercício por ID
export const findById = async (req, res) => {
    try {
        const exercise = await serviceExercise.findById(req.params.id)
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

// GET exercicio por nome
export const findByName = async (req, res) => {
    try {
        const exercise = await serviceExercise.findByName(req.query)
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}