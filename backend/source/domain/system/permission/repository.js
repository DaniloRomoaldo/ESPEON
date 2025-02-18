import { databaseSHIP } from "../../../kenx/knexfile.js";


// Métodos GET
export const findAll = async () => {
    return databaseSHIP.select().from('permissions')
}

export const findById = async (id) => {
    return databaseSHIP.select().from('permissions').where({id:id});
}

export const findByName = async (name) => {
    return databaseSHIP('permissions').select().where({name:name}).first();
}

// Método POST
export const create = async (permission) => {
    await databaseSHIP('permissions').insert({
        name:permission.name
    })
}

// Método PUT & PATCH
export const update = async (id,permission) => {
    await databaseSHIP('permissions').where({id:id}).update({
        name:permission.name
    })
}


// Método DELETE
export const destroy = async (id) => {

    await databaseSHIP.transaction(async (trx) => {
        await trx('user_permission').where({permission_id:id}).del();

        await trx('permissions').where({id:id}).del()
    })

}