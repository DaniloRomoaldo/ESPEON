import * as tablesRepository from './repository.js'

export const getTables = async (query) => {
    const {schema_name} = query;


    return tablesRepository.getTables(schema_name);
}