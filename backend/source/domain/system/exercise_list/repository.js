import { databaseSHIP } from "../../../kenx/knexfile.js";

export const findAll = async() => {
    return databaseSHIP.select(
        'exercise_list.id', 
        'name',
        'db_name',
        'email',
        'created_at'
    )
    .from('exercise_list')
    .join('users', 'exercise_list.created_by', 'users.id')
}

export const findById = async (id) => {
    return databaseSHIP.select(
        'name',
        'db_name',
        'db_path',
        'created_by',
        'created_at'
    ).from('exercise_list')
    .where({id:id})
}

export const findByName = async (name) => {
    return databaseSHIP.select(
        'id',
        'name',
        'db_name',
        'db_path',
        'created_by',
        'created_at'
    ).from('exercise_list').where({name:name})
}

export const create = async (list) => {
   const [inserted] = await databaseSHIP('exercise_list').insert({
        name: list.name,
        db_name: list.db_name,
        db_path: list.db_path,
        created_by: list.created_by,
        created_at: list.created_at
    }).returning('id');

    return inserted.id;
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
        await trx('exercise').where({exercise_list_id:id}).del()

        await trx('exercise_list').where({id:id}).del()
    })
}