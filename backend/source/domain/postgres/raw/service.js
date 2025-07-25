import * as rawRepository from './repository.js'

export const rawQuery = async (body) => {

    const {rawQuery} = body;

    const result = await rawRepository.rawQuery(rawQuery);
    return result;
}


export const rawQueryWithPID = async (body) => {


    const {rawQuery} = body;


    const {pid, resultPromise } = await  rawRepository.rawQueryWithPID(rawQuery)

    // trabalhando o retorno com promise
    return{
        pid,
        resultPromise
    }
}

export const cancelQuery = async (pid) => {
    await rawRepository.cancelQueryByPID(pid);
}