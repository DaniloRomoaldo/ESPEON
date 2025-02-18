import * as schemaRepository from "./repository.js"


export const getSchemas = async () => {
    return schemaRepository.getSchemas();
}