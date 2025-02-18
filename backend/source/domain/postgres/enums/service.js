import * as enumsRepository from './repository.js'

export const getEnums = async (query) => {
    const {schema_name} = query;

    return enumsRepository.getEnums(schema_name);
}

export const getEnumValues = async (query) => {
    const {schema_name, enum_name} = query;

    return enumsRepository.getEnumValues(schema_name, enum_name);
}