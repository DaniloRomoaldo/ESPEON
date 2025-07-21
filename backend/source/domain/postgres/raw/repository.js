import { database } from "../../../kenx/knexfile.js";

export const rawQuery = async (rawQuery) => {
    
        const result = await database.raw(rawQuery);
        return result;

}


export const rawQueryWithPID = async (rawQuery) => {


        // trabalhando com uma transaction para pegar o pid do processo e devolver a query como promise de resposta
        const transaction = await database.transaction();
        const pidResult = await transaction.raw('SELECT pg_backend_pid()');
        const pid = pidResult.rows[0].pg_backend_pid;

        const queryPromise = transaction.raw(rawQuery)
        .then((res) => {
                // commit para finalizar a transaction e não travar o banco
                transaction.commit();
                return res;
        })
        .catch((err) => {
                transaction.rollback();
                throw err;
        });

        // retorno do resultado em promise
        return { 
                pid, 
                resultPromise: queryPromise
        };
}

export const cancelQueryByPID = async (pid) => {
        await database.raw(`SELECT pg_cancel_backend(${pid})`);
}


export const rawQueryWithPID2 = async (rawQuery) => {

}