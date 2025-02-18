import * as repositoryAuth from './repository.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import 'dotenv/config';


export const gerar_token = async (body) => {
    const {email, password} = body;
    const user = await repositoryAuth.findByEmail(email);
 
    const validacao = await bcrypt.compare(password, user.password);



    if (!validacao) { // se senha não for igual retornará nulo, contrário de nulo é verdadeiro então retorna null para a controller
        return null;
    }

    const token = jwt.sign(
        {userId: user.id, username: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '10h'}
    )

    return token;
}