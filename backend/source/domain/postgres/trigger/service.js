import * as repositoryTrigger from './repository.js'

export const getTriggers = async (query) => {
    const {schema_name} = query;

    return repositoryTrigger.getTriggers(schema_name);
}

export const getTriggerCode = async (query) => {
    const {schema_name, table_name, trigger_name} = query;

    return repositoryTrigger.getTriggerCode(schema_name, table_name ,trigger_name )
}