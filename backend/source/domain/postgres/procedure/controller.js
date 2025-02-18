import { ErrorHandler } from '../../system/util/ErrorHandler.js';
import * as procedureService from './service.js'

export const getProcedures = async (req, res) => {

    try {
        
        const procedures = await procedureService.getProcedures(req.query);
        res.status(200).json(procedures);

    } catch (error) {

        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

export const getProcedureCode = async (req, res) => {

    try {
        
        const producerCode = await procedureService.getProducerCode(req.query);
        res.status(200).json(producerCode);

    } catch (error) {
     
        res.status(400).json({error: ErrorHandler.showError(error)})
    }

}

