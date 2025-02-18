import { ErrorHandler } from '../../system/util/ErrorHandler.js';
import * as viewColumnsService from './service.js'

export const getViewColumns = async (req,res) => {

    try {
        
        const viewsColumns = await viewColumnsService.getViewColumns(req.query);
        res.status(200).json(viewsColumns);

    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}
