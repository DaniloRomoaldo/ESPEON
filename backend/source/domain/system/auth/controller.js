import { ErrorHandler } from '../util/ErrorHandler.js';
import * as serviceAuth from './service.js';

export const gerar_token = async (req, res) => {
    try {
        
        const token = await serviceAuth.gerar_token(req.body);

        if (!token) {
           return res.status(400).json({message: "Usuario ou senha inválidos"})
        }

        return res.status(200).json({"token":token});

    } catch (error) {
        return res.status(500).json({error: ErrorHandler.showError(error)})
    }
}