import { getDatabase } from "../../../kenx/knexfile.js";

export const getTriggers = async (schema_name) => {
    const database = getDatabase();

    return database.withSchema('pg_catalog')
                    .select(database.ref('tgname').as('trigger_name'))
                    .from('pg_trigger')
                    .join('pg_class', 'pg_class.oid', 'pg_trigger.tgrelid')
                    .join('pg_namespace', 'pg_class.relnamespace', 'pg_namespace.oid')
                    .join('pg_proc', 'pg_proc.oid', 'pg_trigger.tgfoid')
                    .where({nspname:schema_name})
}

export const getTriggerCode = async (schema_name, table_name, trigger_name) => {
    const database = getDatabase();

    return database.withSchema('pg_catalog')
                    .select(database.raw("pg_get_triggerdef(pg_trigger.oid, TRUE) AS trigger_code"))
                    .from('pg_trigger')
                    .join('pg_class', 'pg_class.oid', 'pg_trigger.tgrelid')
                    .join('pg_namespace', 'pg_class.relnamespace', 'pg_namespace.oid')
                    .join('pg_proc', 'pg_proc.oid', 'pg_trigger.tgfoid')
                    .where({nspname:schema_name})
                    .andWhere({relname:table_name})
                    .andWhere({tgname:trigger_name})
}