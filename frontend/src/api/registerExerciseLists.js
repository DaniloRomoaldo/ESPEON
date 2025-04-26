import { api } from "../lib/axios"


export default async function registerExerciseList(body, query, file) {
    try {
        
        const formData = new FormData();

        formData.append('file', file);
        formData.append('exercises', JSON.stringify(body.exercises))

        const queryParams = new URLSearchParams(query).toString();


        const response = await api.post(
            `/exerciseListDownload?${queryParams}`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data;

        
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}


