import { api } from "../lib/axios"

export default async function listAllExercices({list_name}){


    const queryParams = new URLSearchParams({'name_list':list_name}).toString()
    
    try {
        const response = await api.get(`exercises?${queryParams}`)

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}



export async function deleteExercise({exercise_name}) {

    const queryParams = new URLSearchParams({'name':exercise_name}).toString()
    try {
        const response = await api.delete(`exercise?${queryParams}`)

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}