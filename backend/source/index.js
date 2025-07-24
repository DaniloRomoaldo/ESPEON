import express from 'express';

//------------------- imports autenticação ----------------------------------
import * as authController from './domain/system/auth/controller.js'
import authMiddleware from './domain/system/middlewares/auth.js';

//------------------- imports contexto do bando de dados ---------------------
import { contextMiddleware } from './domain/system/middlewares/contextRequest.js';

//------------------- improts do S.H.I.P  -----------------------------------
import * as usersController from './domain/system/users/controller.js'
import * as permissionController from './domain/system/permission/controller.js'
import * as userPermissionController from './domain/system/user_permission/controller.js'

//--------------------imports do módulo de exercĩcios -----------------------
import multer from 'multer';
import { storage, addPathToBody } from './multerConfig.js';
import * as exercise_listController from "./domain/system/exercise_list/controller.js"
import * as exerciseController from "./domain/system/exercise/controller.js"

//--------------------imports do módulo de laboratório de atividades --------
import * as labAtividadesController from "./domain/laboratorioDeAtividades/lab/controller.js"

//------------------- imports do postgres -----------------------------------
import * as schemasController from "./domain/postgres/schemas/controller.js"
import * as tablesContoller from "./domain/postgres/tables/controller.js"
import * as columnsController from "./domain/postgres/columns/contoller.js"
import * as viewsController from "./domain/postgres/views/controller.js"
import * as viewsColumnsController from "./domain/postgres/viewColumns/controller.js"
import * as rawQueryController from "./domain/postgres/raw/controller.js"
import * as functionController from "./domain/postgres/functions/controller.js"
import * as procedureController from './domain/postgres/procedure/controller.js'
import * as triggersController from './domain/postgres/trigger/controller.js'
import * as enumsController from './domain/postgres/enums/controller.js'

import cors from 'cors';

// importação do webSocket
import './domain/postgres/raw/webSocketServer.js'

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware para verificar qual banco de dados usr
app.use(contextMiddleware)


//-------------------------------- Rota de autenticação ---------------------------------------------------------------
app.post("/token", authController.gerar_token);



//--------------------------------- Rotas de uso para o banco de dados S.H.I.P -----------------------------------------

app.get("/users",authMiddleware , usersController.findAll);
app.get("/user/:id", authMiddleware , usersController.findOne);
app.get("/userEmail", authMiddleware , usersController.findByEmail);
app.post("/user", authMiddleware , usersController.createUser);
//app.put("/user", authMiddleware , usersController.updateUser);
app.patch("/user", authMiddleware , usersController.updateUser);
app.delete("/user", authMiddleware , usersController.deletarUsuario);


app.get("/permissions", authMiddleware , permissionController.findAll);
app.get("/permission/:id", authMiddleware , permissionController.findById);
app.get("/permission", authMiddleware , permissionController.findByName);
app.post("/permission", authMiddleware , permissionController.createPermission);
//app.put("permission", authMiddleware , permissionController.updatePermission);
app.patch("/permission", authMiddleware , permissionController.updatePermission);
app.delete("/permission", authMiddleware , permissionController.deletePermission);


app.get("/permissionsByUser", authMiddleware , userPermissionController.findPermissionsByUser);
app.get("/usersByPermission", authMiddleware , userPermissionController.findUsersByPermission);
app.post("/createUserPermission", authMiddleware , userPermissionController.createPermissionByUser);


//--------------------------------- Rotas do módulo de exercícios SQL -------------------------------------------------------
const upload = multer({storage: storage})

app.get("/exercises", exerciseController.findAllByList)
app.get("/exercise/:id", exerciseController.findById)
app.get("/exercise", exerciseController.findByName)
app.post("/exercise", exerciseController.create)
app.patch("/exercise", exerciseController.update)
app.delete("/exercise", exerciseController.deleteExercise)



// lista de exercício
app.post("/exerciseListDownload", upload.single('file'), addPathToBody , exercise_listController.createExercise_list);
app.get("/exerciseLists", exercise_listController.findAll) // lembrar de add o middleware de autenticação
app.get("/exerciseList/:id", exercise_listController.findById)
app.get("/exerciseList", exercise_listController.findByName)

app.delete("/exerciseList/:id", exercise_listController.destroyExerciseList)

//--------------------------------- Rotas do módulo do laboratório de atividades --------------------------------------------

app.post("/startLabDeAtividades", authMiddleware , labAtividadesController.startLab)
app.post("/stopLabDeAtividades", authMiddleware , labAtividadesController.stopLab)


//--------------------------------- Rotas de uso do postgres ----------------------------------------------------------------

//rota para coletar todos os schemas
app.get("/schemas", authMiddleware , schemasController.getSchemas);

// rota para coletar todas as tabelas de um shcema específico
app.get("/tables" , authMiddleware , tablesContoller.getTables);

// rota para coletar todas as colunas de uma tabela em um schema específico
app.get("/TableColumns", authMiddleware , columnsController.getColumns);

// rota para coletar todas as views de um schema específico
app.get("/views", authMiddleware , viewsController.getViews);

// rota para coletar as colunas de uma view específica
app.get("/viewColumns", authMiddleware ,viewsColumnsController.getViewColumns);

// rota para enviar a raw query a ser rodada no banco
// essa rota não vai mais ser utilizada
app.post("/rawQuery",  authMiddleware ,rawQueryController.rawQuery);

// rota para coletar as funções de um schema
app.get("/functions", authMiddleware , functionController.getFunctions);

// rota para coletar o código fonte de uma função específica
app.get("/functionCode", authMiddleware , functionController.getFunctionCode);

// rota para coletar as procedures de um schema
app.get("/procedures", authMiddleware , procedureController.getProcedures);

// rota para coletar o código fonte de uma procedure específica
app.get("/procedureCode", authMiddleware , procedureController.getProcedureCode);

// rota para coletar as triggers de um shcema
app.get("/triggers",  authMiddleware ,triggersController.getTriggers);

// rota para coletar o código fonte de uma trigger
app.get("/triggerCode",  authMiddleware ,triggersController.getTriggerCode);

// rota para coletar os enums de um schema
app.get("/enums",  authMiddleware ,enumsController.getEnums);

// rota para coletar os valores de um enum
app.get("/enumValues",  authMiddleware ,enumsController.getEnumValues);


// exemplo
//app.get("/triggers?schema_name")




app.listen(port, () => console.log("Api em Execução"))