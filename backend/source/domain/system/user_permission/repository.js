import { databaseSHIP } from "../../../kenx/knexfile.js";

// Métodos GET
export const findAll = async () => {
    return databaseSHIP('user_permission').select()
}

export const findById = async (id) => {
    return databaseSHIP('user_permission').select().where({id:id})
}

export const findByUserId = async (user_id) => {
    return databaseSHIP.select(databaseSHIP.ref('name').as('permission'))
                        .from('user_permission')
                        .join('users', 'users.id', 'user_permission.user_id')
                        .join('permissions', 'permissions.id', 'user_permission.permission_id')
                        .where("users.id", "=", user_id)
                        .orderBy('name', 'asc')
}

export const findByPermissionId = async (permission_id) => {
    return databaseSHIP.select(databaseSHIP.ref('email').as('user'))
                        .from('user_permission')
                        .join('users', 'users.id', 'user_permission.user_id')
                        .join('permissions', 'permissions.id', 'user_permission.permission_id')
                        .where("permissions.id", '=', permission_id) 
                 //       .orderBy('email', 'asc')
}

// Método POST
export const create = async (user_permission) => {
    await databaseSHIP('user_permission').insert({
        user_id: user_permission.user_id,
        permission_id: user_permission.permission_id
    })
}

/*
// Método PUT & PATCH (ATUALIZADO, update não faz sentido nessa tabela)
export const update = async (id, user_permission) => {
    await databaseSHIP('user_permission').where({id:id}).update({
        user_id: user_permission.user_id,
        permission_id: user_permission.permission_id
    })
}
*/


// Método DELETE
export const destroy = async (id) => {
    await databaseSHIP('user_permission').where({id:id}).del();
}