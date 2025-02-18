import Knex from 'knex';
import 'dotenv/config';


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


const config = {
  development: {
    client: 'pg',
    connection: {
      host: db_host,
      port: parseInt(db_port),
      database: db_database,
      user: db_user,
      password: db_password
    }
  }
}

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

//console.log(config)

export const database = Knex(config['development']);
export const databaseSHIP = Knex(config_Main['producer']);
export default {config, config_Main};