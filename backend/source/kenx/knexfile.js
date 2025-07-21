import Knex from 'knex';
import 'dotenv/config';
import { getContext } from '../domain/system/util/requestContext.js';

// ---------------------- variáveis de ambinete --------------------------------
const {
  db_host,
  db_port,
  db_database,
  db_user,
  db_password,
  MAIN_db_host,
  MAIN_db_port,
  MAIN_db_database,
  MAIN_db_user,
  MAIN_db_password,
} = process.env;

// ---------------------- conexão banco de dados do ESPEON --------------------------------

const config_Main = {
  producer: {
    client: 'pg',
    connection: {
      host: MAIN_db_host,
      port: parseInt(MAIN_db_port),
      database: MAIN_db_database,
      user: MAIN_db_user,
      password: MAIN_db_password
    }
  }
}

export const databaseSHIP = Knex(config_Main['producer']);



// ---------------------- conexão banco de dados do SandBox --------------------------------

const sandboxConnection = Knex({
  client: 'pg',
  connection: {
    host: db_host,
    port: parseInt(db_port),
    database: db_database,
    user: db_user,
    password: db_password
  }
});


export function getDatabase(){
  const context = getContext();

  if (context && context.db){
    return context.db;
  }

  return sandboxConnection;

}

export default { config_Main};

