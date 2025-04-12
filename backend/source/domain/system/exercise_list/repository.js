import { databaseSHIP } from "../../../kenx/knexfile";

export const findAll = async() => {
    return databaseSHIP.select().from('exercise_list')
}

export const findById = async (id) => {
    return databaseSHIP.select().from('exercise_list').where({id:id})
}

export const findByName = async (name) => {
    return databaseSHIP.select().from('exercise_list').where({name:name})
}

export const create = async (list) => {
    await databaseSHIP('exercise_list').insert({
        name: list.name,
        db_name: list.db_name,
        db_path: list.db_path,
        created_by: list.created_by,
        created_at: new Date()
    })
}

export const update = async (list) => {
    await databaseSHIP('exercise_list').where({id:list.id}).update({
        name: list.name,
        db_name: list.db_name,
        db_path: list.db_path,
        created_by: list.created_by,
        created_at: new Date()
    })
}

export const destroy = async(id) => {
    await databaseSHIP.transaction( async (trx) => {
        await trx('exercise').where({exercise_list_id:id})

        await trx('exercise_list').where({id:id}).del()
    })
}