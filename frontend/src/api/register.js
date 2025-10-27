import { api } from "../lib/axios";


export async function registerUser({email, password}){

    try {
        const response = await api.post('createUser', {email, password})

        return response

    } catch (error) {
        
        throw new Error(error.response.data.message);

    }
}