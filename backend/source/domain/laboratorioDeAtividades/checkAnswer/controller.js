import { ErrorHandler } from "../../system/util/ErrorHandler.js";
import { analiseAnswer } from "./service.js";


export const checkAnswer = async (req, res) => {
    
    try {
        const answerResult = await analiseAnswer(req.body);
        res.status(200).json(answerResult)
    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }

}