import { ErrorHandler } from "../util/ErrorHandler.js";
import * as serviceExercise_list from './service.js';

// GET todas as listas
export const findAll = async (req,res) => {
    try {
        const lists_exercises = await serviceExercise_list.findAll();
        res.status(200).json(lists_exercises)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

// GET lista por id
export const findById = async (req, res) => {
    try {
        const list_exercises = await serviceExercise_list.findById(req.params.id)
        res.status(200).json(list_exercises)
    } catch (error) {
        // res.status(400).json({error: ErrorHandler.showError(error)})
        res.status(400).json({error: error.message})

    }
}

export const findByName = async (req, res) => {
    try {
        const list_exercises = await serviceExercise_list.findByName(req.query)
        res.status(200).json(list_exercises)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}




// POST criar lista de exercícios
export const createExercise_list = async (req, res) => {
    try {
        const numExercices = await serviceExercise_list.create(req.body, req.query)
        res.status(200).json(`Foram criados exercícios ${numExercices}`);
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})

    }
}



// DELETE deletar lista de exercícios
export const destroyExerciseList = async (req,res) => {
    try {
        await serviceExercise_list.deleteExerciseList(req.params.id)
        res.status(200).json({message:"Lista de Exercĩcios excluida"})
    } catch (error) {
        // res.status(400).json({error: ErrorHandler.showError(error)})
        res.status(400).json({error: error.message})
    }

}