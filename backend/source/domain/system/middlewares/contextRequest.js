import { runWithContext } from "../util/requestContext.js";
import { getLabConnection } from "../../laboratorioDeAtividades/orquestracao/connectionManager.js";

export const contextMiddleware = (req, res, next) => {

    const labSessionId = req.headers['lab-session-id'];

    let contextData = {};

    if (labSessionId){
        const knexConnection = getLabConnection(labSessionId);
        if (knexConnection){
            contextData.db = knexConnection;
        }
    }

    runWithContext(next, contextData);

}