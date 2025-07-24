import { api } from "../lib/axios";

export async function startLab(exercieListId){
    try {
        const response = await api.post('/startLabDeAtividades', {
            exercise_list_id: exercieListId
        });

        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Não foi possível iniciar o ambiente')
    }
}


export async function stopLab(labSessionId) {

    try {
        const response = await api.post(`/stopLabDeAtividades`,{
            labSessionId: labSessionId
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Não foi possível parar o ambiente')
    }
    
}


export async function checkAnswer(body) {

    try {
         const response = await api.post('/checkExerciseAnswer', body)
         return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Não foi possível verificar a resposta.')
    }

    
}