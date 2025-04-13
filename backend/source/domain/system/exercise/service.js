import * as repositoryExercise from './repository.js';

//GET todos
export const findAll = async () => {
    return repositoryExercise.findAll();
}

//GET por id
export const findOne = async (id) => {
    return repositoryExercise.findByOne(id);
}

//GET por nome
export const findByName = async (query) => {
    const {name} = query;

    const exercise = await repositoryExercise.findByName(name)

    return exercise
}

//POST criar  exercícios
export const create = async (body) => {

    const exercise ={
        exercise_list_id: body.exercise_list_id, 
        name: body.name, 
        description: body.description, 
        solution_query: body.solution_query
    }

    await repositoryExercise.create(exercise);
}


// PUT & PATCH atualizar exercício
export const update = async (body) => {
    const {name, new_name, new_description, new_solution_query} = body;

    let old_exercise = await repositoryExercise.findByName(name);

    if (!old_exercise){
        throw new Error("Erro ao encontrar exercicio")
    } else {
        old_exercise.name = new_name ? new_name:old_exercise.name;
        old_exercise.description = new_description ? new_description: old_exercise.description;
        old_exercise.solution_query = new_solution_query ? new_solution_query: old_exercise.new_solution_query;
    }
 
}

// DELETE exercicio
export const deleteExercise = async (body) => {
    const {name} = body;

    let old_exercise = await repositoryExercise.findByName(name);
    if (!old_exercise){
        throw new Error("Erro ao encontrar exercicio");
    } else {
        await repositoryExercise.destroy(old_exercise.id);
    }
}