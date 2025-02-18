import { ErrorHandler } from '../../system/util/ErrorHandler.js';
import * as functionService from './service.js'

export const getFunctions = async (req,res) => {

    try {

        const functionsName = await functionService.getFunctions(req.query);
        res.status(200).json(functionsName)

    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}


export const getFunctionCode = async (req,res) => {

    try {
        
        const functionCode = await functionService.getFunctionCode(req.query)
        res.status(200).json(functionCode);

    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}
