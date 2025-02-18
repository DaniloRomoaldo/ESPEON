import { database } from "../../../kenx/knexfile.js";

export const getProcedures = async (schema_name) => {
    return database.withSchema('pg_catalog')
                    .select(database.ref('proname').as('procedure_name'))
                    .from('pg_proc')
                    .join('pg_namespace', 'pg_proc.pronamespace', 'pg_namespace.oid')
                    .where({nspname:schema_name})
                    .andWhere('prokind', '=', 'p')
}

export const getProcedureCode = async (schema_name, procedure_name) => {
    return database.withSchema('pg_catalog')
    .select(database.raw('pg_get_functiondef(pg_proc.oid) AS procedure_structure'))
    .from('pg_proc')
    .join('pg_namespace', 'pg_proc.pronamespace', 'pg_namespace.oid')
    .where({nspname:schema_name})
    .andWhere({proname:procedure_name})
    .andWhere('prokind', '=', 'p')
}
