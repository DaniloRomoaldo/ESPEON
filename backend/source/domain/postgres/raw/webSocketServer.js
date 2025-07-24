import WebSocket, {WebSocketServer} from 'ws';
import * as rawQueryService from './service.js'
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import 'dotenv/config'
import { getLabConnection } from '../../laboratorioDeAtividades/orquestracao/connectionManager.js';
import { runWithContext } from '../../system/util/requestContext.js';



const wss = new WebSocketServer({port:3001});



// função de autenticação do cliente para o webScoket e temporização da conexão
function autenticateWebSocketConnection(req, ws){
    // Extraindo o cookie da sessão para autenticação
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies.auth_token;

    if (!token) throw new Error('Token ausente');

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    ws.user = decoded;

    // valida o tempo de duração do webSocket 
    const currentTime = Math.floor(Date.now() / 1000);
    const secondsUntilExpire = decoded.exp - currentTime;

    // verifica tempo do token
    if (secondsUntilExpire > 0) {
        setTimeout(() => {
            // fecha conexão
          ws.close(4002, 'Token expirado');
        }, secondsUntilExpire * 1000);
    }

    return decoded;

}



wss.on('connection', (ws, req) =>{
    console.log('cliente conectado no webSocket')

   
    // validação do token (auenticação)
    try {
        autenticateWebSocketConnection(req, ws);
    } catch (error) {
        ws.close(4001, 'Token inválido')
        return;
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    const labSessionId = cookies.labSessionId;

    if (labSessionId) {
        ws.labSessionId = labSessionId;
    }

    // comunicação do webSocket após autenticação
    ws.on('message', async (data) => {

        let contextData = {};
        if (ws.labSessionId) {
            const knexConnection = getLabConnection(ws.labSessionId);
            if (knexConnection) {
                contextData.db = knexConnection;
            }
        }

        runWithContext(async () => {
            try {
                const body = JSON.parse(data);

                switch (body.type) {
                    case 'query':{

                        // Dividindo a requisição em 2 promises, primeiro para o pid e depois para o resultado da query
                        const { pid, resultPromise } = await rawQueryService.rawQueryWithPID(body);
                
                        // primeiro devolve o pid para cliente poder cancelar
                        ws.send(JSON.stringify({ type: 'pid', pid }));
                
                        const result = await resultPromise;

                        // depois devolve o resultado da query
                        ws.send(JSON.stringify({ type: 'result', success: true, data: result }));
                        break;

                    }
                    case 'cancel':{
                        const {pid} = body;
                        await rawQueryService.cancelQuery(pid);
                        ws.send(JSON.stringify({
                            type: 'cancelled', 
                            success: false,
                            error: `Query Cancelada`
                        }));
                        break;
                    }

                    default:
                        ws.send(JSON.stringify({ type: 'error', success: false, error: 'Ação desconhecida' }));
                }

            
            } catch (error) {
                ws.send(JSON.stringify({ type: 'error', success: false, error: error.message }));
            }
        }, contextData);
    });


    ws.on('close', () => {
        console.log('conexão finalizada')
    });
});

console.log('webScoker no ar!!!')
