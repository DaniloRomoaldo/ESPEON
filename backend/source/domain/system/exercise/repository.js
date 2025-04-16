import { databaseSHIP } from "../../../kenx/knexfile.js";

export const findAll = async () => {
    return databaseSHIP.select(
        'exercise.id',
        'exercise.exercise_list_id',
        'exercise_list.name as name_list',
        'exercise.name',
        'exercise.description',
        'exercise.solution_query',
        'exercise.created_at',
    )
    .from('exercise')
    .join('exercise_list', 'exercise_list.id', 'exercise.exercise_list_id')
}

export const findById = async (id) => {
    return databaseSHIP.select(
        'exercise.id',
        'exercise.exercise_list_id',
        'exercise_list.name as name_list',
        'exercise.name',
        'exercise.description',
        'exercise.solution_query',
        'exercise.created_at',
    )
    .from('exercise')
    .join('exercise_list', 'exercise_list.id', 'exercise.exercise_list_id')
    .where({'exercise.id':id})
}

export const findByName = async (name) => {
    return databaseSHIP.select(
        'exercise.id',
        'exercise.exercise_list_id',
        'exercise_list.name as name_list',
        'exercise.name',
        'exercise.description',
        'exercise.solution_query',
        'exercise.created_at',  
    )
    .from('exercise')
    .join('exercise_list', 'exercise_list.id', 'exercise.exercise_list_id')
    .where({'exercise.name':name})
}

export const findByExerciceList = async(id) => {
    return databaseSHIP.select('name','description').from('exercise').where({'exercise_list_id':id})
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

export const destroyByList = async (list_id) => {
    await databaseSHIP.transaction( async (trx) =>{
        await trx('exercise').where({exercise_list_id:list_id}).del()
    })
}

