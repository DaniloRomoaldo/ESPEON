import * as repositoryPermissions from './repository.js';

// GET todos
export const findAll = async () => {
    return repositoryPermissions.findAll();
}

// GET por id
export const findById = async (id) => {
    
    const permission = await repositoryPermissions.findById(id)

    if(!permission){
        throw new Error("Permissão não encontrada")
    }

    return permission;
}

// GET por nome
export const findByName = async (query) => {
    const {name} = query;

    const permission = await repositoryPermissions.findByName(name);

    if (!permission) {
        throw new Error("Permissão não encontrada")
    }

    return permission;
}


// POST criar permissão
export const create = async (body) => {
    await repositoryPermissions.create(body);
}

// PUT & PATCH atualizar permissão
export const update = async (body) => {

    const {old_name, new_name} = body;

    let old_permission = await repositoryPermissions.findByName(old_name)
    
    if (!old_permission){
        throw new Error("Permissão não encontrada")
    } else {
        old_permission.name = new_name ? new_name:old_permission.name;

        await repositoryPermissions.update(old_permission.id, old_permission)
    }

  
}

// DELETE permission
export const deletePermission = async (body) => {
    const {name} = body;

    let old_permission = await repositoryPermissions.findByName(name);

    if(!old_permission){
        throw new Error("Permissão não encontrada")
    }

    await repositoryPermissions.destroy(old_permission.id)
}