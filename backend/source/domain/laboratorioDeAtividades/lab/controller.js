import * as labService from './service.js'

export const startLab = async (req, res) => {

    try{
        const {exercise_list_id} = req.body;

        if (!exercise_list_id){
            return res.status(400).json({error:'exercise_list_id é obrigatório.'})
        }

        const result = await labService.createLabSession(exercise_list_id);

        res.status(201).json(result);

    }catch (error){
        console.error('[LabController] Erro delegado pelo serviço:', error.message);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }
}

export const stopLab = async (req, res) => {
    
    try {
        
        const {labSessionId} = req.body

        await labService.destroyLabSession(labSessionId);
        res.status(200).json({ message: `Sessão finalizada com sucesso.` });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }
}