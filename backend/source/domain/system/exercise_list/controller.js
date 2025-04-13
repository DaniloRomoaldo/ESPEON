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
        //console.log(req.params.id)
        const list_exercises = await serviceExercise_list.findById(req.params.id)
        //console.log(list_exercises)
        res.status(200).json(list_exercises)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
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