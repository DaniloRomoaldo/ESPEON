import {exec} from 'child_process'
import { promisify } from 'util'
import path from 'path'

// Transforma o exec baseado em callback do child_process em uma promise async
const execAsync = promisify(exec);

export async function startLabContainer(labSessionId, dbPort, dumpPath) {
    const composeFilePath = path.resolve(
        process.cwd(),
        'domain/laboratorioDeAtividades/docker-compose.lab.yml'
    );
    
    // variáveis de ambiente para startar o banco modular
    const env = {
        DB_NAME: `db_${labSessionId}`,
        DB_USER: 'lab_user',
        DB_PASSWORD: 'lab_password',
        DB_PORT: dbPort,
        DUMP_PATH: dumpPath,
    };

    // -f é o caminho da docker compose
    // -p é o nome do projeto, é cricial para o isomenento do banco de dados
    const command = `docker-compose -f "${composeFilePath}" -p ${labSessionId} up -d`;

    console.log(`[DockerService] Executando comando: ${command}`);

    try{

        // Executando o comando no terminal
        await execAsync(command, {env});

       
        console.log(`[DockerService] Container para ${labSessionId} iniciado com sucesso.`);

        return env;

    }catch (error){
        console.error(`[DockerService] Exceção ao executar o comando:`, error);
        throw error;
    }


}


export async function stopLabContainer(labSessionId) {
    const composeFilePath = path.resolve(
         process.cwd(),
        'domain/laboratorioDeAtividades/docker-compose.lab.yml'
    );

    // comando 'down -v' derruba e remove todos os volumes do container
    const command = `docker-compose -f "${composeFilePath}" -p ${labSessionId} down -v`;

    console.log(`[DockerService] Executando comando de parada: ${command}`);

    try {
        await execAsync(command);
        console.log(`[DockerService] Ambiente para ${labSessionId} parado com sucesso.`);
    }catch (error) {
        console.error(`[DockerService] Erro ao parar o ambiente ${labSessionId}:`, error);
        throw error;
    }

    
}