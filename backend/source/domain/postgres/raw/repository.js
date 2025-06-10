import { database } from "../../../kenx/knexfile.js";

export const rawQuery = async (rawQuery) => {
    
        const result = await database.raw(rawQuery);
        return result;

}


export const rawQueryWithPID = async (rawQuery) => {

        // trabalhando com uma transaction para pegar o pid do processo e devolver a query como promise de resposta
        const transaction = await database.transaction();

        const pidResult = await transaction.raw('SELECT pg_backend_pid()');

        const pid = pidResult.rows?.[0]?.pg_backend_pid;


        const queryPromise = transaction.raw(rawQuery);

        return{
                pid,
                resultPromise: queryPromise,
                transaction
        };
}

export const cancelQueryByPID = async (pid) => {
        await database.raw(`SELECT pg_cancel_backend(${pid})`);
}