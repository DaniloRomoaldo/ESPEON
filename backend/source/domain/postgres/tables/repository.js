import { database } from "../../../kenx/knexfile.js";

export const getTables = async (schema_name) => {

    return database.select(database.ref('tablename').as('table_name'))
                .from('pg_tables')
                .where({schemaname:schema_name})
}