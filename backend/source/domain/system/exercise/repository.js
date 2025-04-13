import { databaseSHIP } from "../../../kenx/knexfile.js";

export const findAll = async () => {
    return databaseSHIP.select().from('exercise')
}

export const findByOne = async (id) => {
    return databaseSHIP.select().from('exercise').where({id:id})
}

export const findByName = async (name) => {
    return databaseSHIP.select().from('exercise').where({name:name})
}


export const bulkCreate = async (exercises) => {
    if (!exercises || exercises.length === 0){
        return []
    };

    return await databaseSHIP('exercise').insert(exercises);
}

export const create = async (exercise) => {
    await databaseSHIP('exercise').insert({
        exercise_list_id: exercise.exercise_list_id,
        name: exercise.name,
        description: exercise.description,
        solution_query: exercise.solution_query,
        created_at: exercise.created_at
    })
}

export const update = async (id, exercise) => {
    await databaseSHIP('exercise').where({id:id}).update({
        name: exercise.name,
        description: exercise.description,
        solution_query: exercise.solution_query,
        created_at: new Date()
    })
}

export const destroy = async(id) => {
    await databaseSHIP.transaction( async (trx) => {
        await trx('exercise').where({id:id}).del()
    })
}