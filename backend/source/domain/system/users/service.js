import * as repositoryUsers from './repository.js';
import bcrypt from 'bcrypt';

// função hash+salt para senha
const createHashPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}



// GET todos
export const findAll = async () => {
    return repositoryUsers.findAll();
}

// GET vislualizar por id
export const findOne = async(id) => {
    return repositoryUsers.findOne(id)
}

// GET visualizar por email
export const findByEmail = async(query) => {
    const {email} = query;
    const user = await repositoryUsers.findByEmail(email);

    if (!user){
        throw new Error("usuario não encontrado");
    }

    return user;
}

// POST criar registrar ususario
export const create = async(body) => {
    const {password} = body;

    const hashPassword = await createHashPassword(password);

    const user = {
        email: body.email,
        password:hashPassword
    }

    await repositoryUsers.create(user)


}

// Atualizar usuário
export const updateUser = async(body) => {
    const {email, new_password ,old_password} = body;

    let user_old = await repositoryUsers.findByEmail(email)

    if (!user_old){  // user_old retorna como falso, não exsite
         throw new Error ("usuario não encontrado")
    }

    if(user_old.password == await createHashPassword(old_password)){

        user_old.email = email ? email:user_old.email;
        user_old.password = await createHashPassword(new_password);

        await repositoryUsers.update(user_old.id, user_old);
    }
}


// Deletar um usuario
export const deleteUser = async(body) =>{
    const {email, password} = body;

    let user_old = await repositoryUsers.findByEmail(email)

    if(!user_old){
        throw new Error ("usuario não encontrado")
    }

    if(password == user_old.password){
        await repositoryUsers.destroy(user_old.id)
    }

}