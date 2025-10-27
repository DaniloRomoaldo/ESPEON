import * as serviceLogRegister from './service.js'
import { ErrorHandler } from '../../system/util/ErrorHandler.js'

// Recuperar todas as listas disponíveis
export const getExerciseLists = async(req, res) => {
    try {
        const exerciseLists = await serviceLogRegister.getExerciseLists()
        res.status(200).json(exerciseLists)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

// Coletar todos os nomes de exercícios
export const getExercisesNames = async(req, res) => {
    try {
        const exercises = await serviceLogRegister.getExercisesNames()
        res.status(200).json(exercises)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

// Coletar todos os usuarios 
export const getUsersLog = async (req, res) => {
    try {
        const users = await serviceLogRegister.getUsersLog()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}



// Coletar as respostas do aluno na lista
export const generateActivityReport = async(req, res) => {
    try {
        const result = await serviceLogRegister.generateActivityReport(req.body);
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

