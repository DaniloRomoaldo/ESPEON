import * as repositoryExercise_list from './repository.js'
import * as repositoryExercise from '../exercise/repository.js'
import * as repositoryUsers from '../users/repository.js'
import { databaseSHIP } from '../../../kenx/knexfile.js';
import path from 'path';
import fs from 'fs/promises';

// GET todas as listas
export const findAll = async () => {
    return repositoryExercise_list.findAll();
}

// GET por id
export const findById = async (id) => {
    const list = await repositoryExercise_list.findById(id);
    const exercices = await repositoryExercise.findByExerciceList(id)

    return{
        list,
        'exercises':exercices
    }
}

// GET por nome
export const findByName = async (query) => {
    const {name_list} = query;
    const exercise_list = await repositoryExercise_list.findByName(name_list);

    if (!exercise_list){
        throw new Error("Lista não encontrada")
    }

    return exercise_list;
}

//POST 
export const create = async (body, query) => {
    const {name_list , db_name, userId} = query;
    const db_path = body.db_path;
    const exercises = JSON.parse(body.exercises);

    const user = await repositoryUsers.getOne(userId)

    // erro se o id do usuario for modificado
    if(!user){
        throw new Error('Erro ao encontrar usuario')
    }

    const listExist = await repositoryExercise_list.findByName(name_list); 

    if(listExist[0]){ //devolver um array de objetos 
        throw new Error('Existe uma lista de exercício com esse nome, por favor escolha outro nome')
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


// PUT & PATH atualizar lista
export const updateExerciseList = async (body,query) => {
    
}


// DELETE

export const deleteExerciseList = async (list_id) => {

    const exercices_list = await repositoryExercise_list.findById(list_id);
    if(!exercices_list[0])
        throw new Error("Lista de exercícos não encontrada")
    
    else(exercices_list[0].db_path && typeof exercices_list[0].db_path === 'string')    
        const file_path = path.resolve(exercices_list[0].db_path);
        await fs.unlink(file_path);
       
        await repositoryExercise_list.destroy(list_id)
     
}