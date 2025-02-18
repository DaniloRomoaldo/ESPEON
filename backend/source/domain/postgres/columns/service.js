import * as columnsRepository from './repository.js'

export const getTables = async (query) => {
    const {schema_name, table_name} = query 

    return columnsRepository.getTables(schema_name, table_name);

}