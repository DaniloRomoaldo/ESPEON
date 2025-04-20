import { api } from "../lib/axios";

export async function registerExerciseList(body) {
    try {
        const response = await api.post('exerciseListDownload', {body})

        console.log(response.data)
        
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}