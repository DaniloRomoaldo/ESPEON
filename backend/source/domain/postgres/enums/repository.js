import { getDatabase } from "../../../kenx/knexfile.js";

export const getEnums = async (schema_name) => {

    const database = getDatabase();

    return database.withSchema('pg_catalog')
                    .distinct(database.ref('typname').as('enum_name'))
                    .from('pg_enum')
                    .join('pg_type', 'pg_type.oid', 'pg_enum.enumtypid')
                    .join('pg_namespace', 'pg_namespace.oid', 'pg_type.typnamespace')
                    .where({nspname:schema_name})
                    
}


export const getEnumValues = async (schema_name, enum_name) => {

    const database = getDatabase();

    return database.withSchema('pg_catalog')
                    .select(database.ref('enumlabel').as('enum_values'))
                    .from('pg_enum')
                    .join('pg_type', 'pg_type.oid', 'pg_enum.enumtypid')
                    .join('pg_namespace', 'pg_namespace.oid', 'pg_type.typnamespace')
                    .where({nspname:schema_name})
                    .andWhere({typname:enum_name})
}