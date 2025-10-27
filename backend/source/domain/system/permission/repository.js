import { databaseESPEON } from "../../../kenx/knexfile.js";


// Métodos GET
export const findAll = async () => {
    return databaseESPEON.select().from('permissions')
}

export const findById = async (id) => {
    return databaseESPEON.select().from('permissions').where({id:id});
}

export const findByName = async (name) => {
    return databaseESPEON('permissions').select().where({name:name}).first();
}

// Método POST
export const create = async (permission) => {
    await databaseESPEON('permissions').insert({
        name:permission.name
    })
}

// Método PUT & PATCH
export const update = async (id,permission) => {
    await databaseESPEON('permissions').where({id:id}).update({
        name:permission.name
    })
}


// Método DELETE
export const destroy = async (id) => {

    await databaseESPEON.transaction(async (trx) => {
        await trx('user_permission').where({permission_id:id}).del();

        await trx('permissions').where({id:id}).del()
    })

}