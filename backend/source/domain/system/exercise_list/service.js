import * as repositoryExercise_list from './repository.js'
import * as repositoryExercise from '../exercise/repository.js'
import * as repositoryUsers from '../users/repository.js'

export const findAll = async () => {
    return repositoryExercise_list.findAll();
}



//POST 
export const create = async (body, query) => {
    const {name_list , db_name, userId} = query;
    const db_path = body.db_path;
    const exercises = JSON.parse(body.exercises);

    const user = await repositoryUsers.getOne(userId)

    if(!user){
        throw new Error('Erro ao encontrar usuario')
    }

    //primeiro cria a lista
    let list = {
        name: name_list,
        db_name:db_name,
        db_path:db_path,
        created_by: userId,
        created_at: new Date()
    }


    const exercise_list_id = await repositoryExercise_list.create(list);

    const exercisesToInsert = exercises.map(exercise => ({
        exercise_list_id,
        name: exercise.name,
        description: exercise.description,
        solution_query: exercise.solution_query,
        created_at: new Date()
    }))

    await repositoryExercise.bulkCreate(exercisesToInsert)

    return exercisesToInsert.length

} 