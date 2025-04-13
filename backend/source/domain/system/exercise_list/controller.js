import { ErrorHandler } from "../util/ErrorHandler.js";
import * as serviceExercise_list from './service.js';







// POST criar lista de exercícios
export const createExercise_list = async (req, res) => {
    try {
        await serviceExercise_list.create(req.body, req.query)
        res.status(200).json(`Foram criados exercícios`);
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}