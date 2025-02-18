import * as repositoryUserPermission from './repository.js';
import * as serviceUser from '../users/service.js'
import * as servicePermission from '../permission/service.js'
import { query } from 'express';
// GET todos
export const findAll = async () => {
    return repositoryUserPermission.findAll();
}

// GET permissões por User
export const findByUser = async (query) => {
    const {email} = query

    const user = await serviceUser.findByEmail(query={email:email})

    //console.log(user[0].id) 

    if(!user){
        throw new Error("Usuario não encontrado")
    }

    return repositoryUserPermission.findByUserId(user[0].id)

}

// GET usuarios por permissão
export const findByPermissionName = async (query) => {
    const {permission_name} = query;

    const permission = await servicePermission.findByName(query={name:permission_name});

    if (!permission) {
        throw new Error("Permissão não existe")
    }

    return servicePermission.findById(permission.id)
}


// POST criar permissão para usuario
export const create = async (body) => {

    const {email, permission_name} = body;


    const user = await serviceUser.findByEmail(body={email:email})

   
    
    if (!user) {
        throw new Error("usuario inexistente")
    }

    const permission = await servicePermission.findByName(body={name:permission_name})

    if (!permission) {
        throw new Error("permissão inexistente")
    }


    let user_permission = {
        user_id: user[0].id,
        permission_id: permission.id
    }


    // precisa implementar lógica de autorização para criar permissões

    return repositoryUserPermission.create(user_permission);
}


// DELETE permissão 
export const deletePermissao = async (body) => {
    const {email, permission_name} = body;

    const user = await serviceUser.findByEmail(query={email:email})

    if (!user) {
        throw new Error("usuario inexistente")
    }

    const permission = await servicePermission.findByName(query={name:permission_name})

    if (!permission) {
        throw new Error("permissão inexistente")
    }


    const user_permissions = await repositoryUserPermission.findByUserId(user.id)


   for (let contador = 0; contador < array.length; contador++) {
    const element = user_permissions[contador][2];

        if (element == permission.id) {

            await repositoryUserPermission.destroy(element.permission_id)
            
            break;
        }
   }


}