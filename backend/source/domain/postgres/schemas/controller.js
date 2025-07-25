import { ErrorHandler } from "../../system/util/ErrorHandler.js";
import * as schemasService from "./service.js"


export const getSchemas = async (req, res) => {
    try {
        const schemas = await schemasService.getSchemas();
        res.status(200).json(schemas);

    } catch (error) {
        res.status(400).json({error: ErrorHandler.showError(error)})
    }
}

