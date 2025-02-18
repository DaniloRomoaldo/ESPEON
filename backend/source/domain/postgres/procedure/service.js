import * as procedureService from './repository.js'

export const getProcedures = async (query) => {
    const {schema_name} = query;

    return procedureService.getProcedures(schema_name);
}

export const getProducerCode = async (query) => {
    const {schema_name, procedure_name} = query;

    return procedureService.getProcedureCode(schema_name, procedure_name);
}