import { ErrorHandler } from '../../system/util/ErrorHandler.js';
import * as viewService from './service.js'

export const getViews = async (req,res) => {

    try {
        const tables = await viewService.getViews(req.query);
        res.status(200).json(tables)

    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}
