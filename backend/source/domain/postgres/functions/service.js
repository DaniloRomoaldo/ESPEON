import * as functionRepository from './repository.js'

export const getFunctions = async (query) => {

    const {schema_name} = query;

    return functionRepository.getFunctions(schema_name);

}

export const getFunctionCode = async (query) => {
    const {schema_name, function_name} = query;

    return functionRepository.getFunctionCode(schema_name, function_name);
}