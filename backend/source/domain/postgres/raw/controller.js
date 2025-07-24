import { ErrorHandler } from '../../system/util/ErrorHandler.js';
import * as queryService from './service.js'

export const rawQuery = async (req,res) => {
    try {
        const queryResult = await queryService.rawQuery(req.body)

        res.status(200).json({sucess:true, data:queryResult});

    } catch (error) {
        res.status(200).json({sucess:false, error: error.message})
    }
}

