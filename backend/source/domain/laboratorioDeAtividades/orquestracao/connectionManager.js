import Knex from 'knex';

// O map vai servir para armazenar as conexões ativas
// cada conexão será reconhecida pela chava labSessionId que será a instância do Knex
const activeConnections = new Map();


// função para criar e armazenar uma coenxão do Knex para um laboratório específico (futuramente pode limitar por aluno ou algo do tipo)
export function createLabConnection(labSessionId, connectionConfig) {
    console.log(`[ConnManager] Criando conexão para ${labSessionId} na porta ${connectionConfig.DB_PORT}`);

    const KnexInstance = Knex({
        client: 'pg',
        connection:{
            host: '127.0.0.1',
            port: connectionConfig.DB_PORT,
            user: connectionConfig.DB_USER,
            password: connectionConfig.DB_PASSWORD,
            database: connectionConfig.DB_NAME
        },
        pool: {min:0, max:5}
    });

    // Armazenando a isntnacia no map
    activeConnections.set(labSessionId, KnexInstance);
    return KnexInstance;

}


// recuperar uma conexão ativa
export function getLabConnection(labSessionId){
    return activeConnections.get(labSessionId)
}


// fechando a conexão com banco e removendo do gerenciamento das conexões ativas.
export async function destroyLabConnection(labSessionId) {
    const connection = activeConnections.get(labSessionId);

    if (connection) {

        console.log(`[ConnManager] Destruindo conexão para ${labSessionId}`);
        await connection.destroy(); // fecha a conexão do knex
        activeConnections.delete(labSessionId)
    }
}