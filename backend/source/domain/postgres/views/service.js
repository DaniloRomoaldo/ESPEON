import * as viewRepository from './repository.js'

export const getViews = async (query) => {
    const {schema_name} = query;

    return viewRepository.getViews(schema_name);
}