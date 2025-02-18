import * as tablesService from './repository.js'

export const getTables = async (query) => {
    const {schema_name} = query;


    return tablesService.getTables(schema_name);
}