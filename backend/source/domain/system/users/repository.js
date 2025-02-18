import { databaseSHIP } from "../../../kenx/knexfile.js";


// Métodos GET
export const findAll = async () =>{
    return databaseSHIP.select('email').from('users')
}

export const getOne = async (id) => {
    return databaseSHIP.select('id','email').from('users').where({id:id})
}

export const findByEmail = async (email) => {
    return databaseSHIP.select('id','email').from('users').where({email:email})
}

// Método POST

export const create = async(user) => { 
    await databaseSHIP('users').insert({
        email: user.email,
        password: user.password
    })
}


// Método PUT & PATCH

export const update = async(id,user) => {
    await databaseSHIP('users').where({id:id}).update({
        email: user.email,
        password: user.password
    })
}

// Método DELETE

export const destroy = async(id) => {

    await databaseSHIP.transaction( async (trx) => {
        await trx('user_permission').where({user_id:id}).del()

        await trx('users').where({id:id}).del();
    })
 
     
}