import * as serviceExercise from './service.js'
import { ErrorHandler } from '../util/ErrorHandler.js'

// GET todos os exercícios
export const findAllByList = async (req, res) => {
    try {
        const exercise = await serviceExercise.findAll(req.query)
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

// POST exercício
export const create = async (req, res) => {
    try {
        const exercise = await serviceExercise.create(req.body)
        res.status(200).json({message: "Exercício criado com sucesso"})
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    } 
}

export const update = async (req, res) => {
    try {
        const exercise = await serviceExercise.update(req.body)
        res.status(200).json({message: "Exercício atualizado"})
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

export const deleteExercise = async (req, res) => {
    try {
        await serviceExercise.deleteExercise(req.query);
        res.status(200).json({message:"Exercício removido"})
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}