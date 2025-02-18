import * as viewColumnsRepository from './repository.js'

export const getViewColumns = async (query) => {
    const {schema_name, table_name} = query;

    return viewColumnsRepository.getViewColumns(schema_name, table_name);

}