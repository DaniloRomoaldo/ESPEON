import pkg from 'pg';

const { DatabaseError } = pkg;

export class ErrorHandler {

    /*
    ErrorHandler(){
        const errorObj = {
            message: "",
            status: 500,
            name: ""
        }
    }
*/

    static errorObj = {
        message: "",
        status: 500,
        name: ""
    };

    static showError(error) {
        if(error instanceof DatabaseError){
            this.errorObj.message = "Erro aao acessar o banco de dados!"; 
            this.errorObj.status = 500;
            return this.errorObj;
        }else{
            this.errorObj.message = error.message;
            this.errorObj.status = 401;
            this.errorObj.name = error.name;
            return this.errorObj; 
        }
    }
}