import { api } from "../lib/axios";
import Cookies from "js-cookie"

export async function login({email, password}) {
    
    try {
        const response = await api.post('token', {email, password})
        
        console.log(response.data)
        const {token, userId} = response.data.token;

        Cookies.set('auth_token', token, {expires:1, secure: true});
        Cookies.set('userId',userId, {expires:1, secure: true} )
        return { token, email };

    }catch(error){

        throw new Error(error.response.data.message);
        
    }
}

