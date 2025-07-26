import { api } from "../lib/axios";

export async function getSchemas() {
    try {
        const response = await api.get('schemas')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
    
}

export async function getDatabaseElement(schemaName, elementName) {
    try {
        const response = await api.get(elementName,{
            params:{
                schema_name: schemaName
            }
        });

        return response.data;

    } catch (error) {
        throw new Error(error.response.data.message);
    }
    
}


export async function getTableColumns(schemaName, tableName) {
    try {
        const response = await api.get('TableColumns', { 
            params: {
                schema_name: schemaName,
                table_name: tableName
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar colunas da tabela.');
    }
}

