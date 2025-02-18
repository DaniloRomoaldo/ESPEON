import { database } from "../../../kenx/knexfile.js";

export const rawQuery = async (rawQuery) => {
    
    //try {
        const result = await database.raw(rawQuery);

        return result;
    //} catch (error) {

        //if(error.code && error.detail){
        //    throw new Error(`PostgresSQL Error: ${error.message} (code: ${error.code}, detail: ${error.detail})`);
        //}

      //  throw new Error(`Database Error: ${error.message}`)
    //}
}