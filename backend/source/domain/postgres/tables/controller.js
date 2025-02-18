import { ErrorHandler } from '../../system/util/ErrorHandler.js';
import * as tablesService from './service.js'

export const getTables = async (req, res) => {

    try {
        
        const tables = await tablesService.getTables(req.query);
        res.status(200).json(tables);

    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }

}

