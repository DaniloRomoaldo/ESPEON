import * as repositoryExercise from './repository.js';

//GET todos
export const findAll = async () => {
    return repositoryExercise.findAll();
}

//GET por id
export const findById = async (id) => {
    return repositoryExercise.findById(id);
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
        solution_query: body.solution_query,
        created_at: new Date()
    }

    await repositoryExercise.create(exercise);
}


// PUT & PATCH atualizar exercício
export const update = async (body) => {
    const {name, new_name, new_description, new_solution_query} = body;

    let old_exercise = await repositoryExercise.findByName(name);

    if (!old_exercise[0]){
        throw new Error("Erro ao encontrar exercicio")
    } else {
        
        old_exercise[0].name = new_name ? new_name:old_exercise[0].name;
        old_exercise[0].description = new_description ? new_description: old_exercise[0].description;
        old_exercise[0].solution_query = new_solution_query ? new_solution_query: old_exercise[0].new_solution_query;
        old_exercise[0].created_at = new Date();
    
        await repositoryExercise.update(old_exercise[0].id, old_exercise[0])
    }
 
}

// DELETE exercicio
export const deleteExercise = async (query) => {
    const {name} = query;

    let old_exercise = await repositoryExercise.findByName(name);
    if (!old_exercise[0]){
        throw new Error("Erro ao encontrar exercicio");
    } else {
        await repositoryExercise.destroy(old_exercise[0].id);
    }
}