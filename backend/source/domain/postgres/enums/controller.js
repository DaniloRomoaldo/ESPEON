import { ErrorHandler } from '../../system/util/ErrorHandler.js';
import * as enumsService from './service.js'

export const getEnums = async (req, res) => {

    try {
        
        const enums = await enumsService.getEnums(req.query);
        res.status(200).json(enums)

    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

export const getEnumValues = async (req, res) => {

    try {
        
        const enumValues = await enumsService.getEnumValues(req.query)
        res.status(200).json(enumValues);

    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}
