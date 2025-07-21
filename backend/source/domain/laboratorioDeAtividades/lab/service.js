import * as repositoryExercise_list from '../../system/exercise_list/repository.js'
import { findFreePort } from '../../../utils/portManager.js';
import { startLabContainer } from '../orquestracao/dockerService.js';
import { createLabConnection, getLabConnection, destroyLabConnection  } from '../orquestracao/connectionManager.js';
import { stopLabContainer } from '../orquestracao/dockerService.js';
import path from 'path'



export async function createLabSession(exercise_list_id) {

    const exercise_list = await repositoryExercise_list.findById(exercise_list_id);


    if (!exercise_list){
        const error = new Error('Lista de exercícios não encontrada.');
        error.statusCode = 404; 
        throw error;
    }

    // const dumpPath = path.resolve(exercise_list[0].db_path);

    const dumpPath = exercise_list[0].db_path;

    

    // orquestração de dependências para criação
    const port = await findFreePort();
    const labSessionId = `lab_${exercise_list_id}_${Date.now()}`;
    const envInfo = await startLabContainer(labSessionId, port, dumpPath);

    // Delay de segurança para garantir que o container seja levantado e populado corretamente, deve ser aumentado dependendo do dump
    await new Promise(resolve => setTimeout(resolve, 5000));

    createLabConnection(labSessionId, envInfo);

    // retorna o id da sessão para a controller
    return{ labSessionId: labSessionId,
        connectionDetails: {
            DB_NAME: envInfo.DB_NAME,
            DB_PORT: envInfo.DB_PORT
        }

    }
}


export async function name(params) {
    
}

export async function destroyLabSession(labSessionId) {


    // destroi o container docker
    await stopLabContainer(labSessionId);

    // destroi a conexão knex que estava armazenada em memória
    await destroyLabConnection(labSessionId)
    
}