import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create ({
    baseURL: "http://localhost:3000"
})

api.interceptors.request.use((config) => {
    const token = Cookies.get('auth_token'); //coletando o token armazenado no cookie 
    if (token) {
        config.headers['Authorization'] = token; // Adiciona o token no header Authorization
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export {api};

