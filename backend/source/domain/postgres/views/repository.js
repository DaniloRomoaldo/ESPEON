import { getDatabase } from "../../../kenx/knexfile.js";

export const getViews = async (schema_name) => {
    const database = getDatabase();

    return database.withSchema('pg_catalog')
                .select(database.ref('relname').as('view_name'))
                .from('pg_class')
                .join('pg_namespace', 'pg_class.relnamespace', 'pg_namespace.oid')
                .where({nspname:schema_name})
                .andWhere('pg_class.relkind', '=', 'v')
}

