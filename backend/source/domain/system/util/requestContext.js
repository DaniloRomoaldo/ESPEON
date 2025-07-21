import { AsyncLocalStorage } from 'async_hooks';

const storage = new AsyncLocalStorage();

// Armazena os dados do contexto da requisição atual
export function runWithContext(callback, data){
    storage.run(data, callback);
}


// retornar todos os dados armazenados no contexto da requisição atual
export function getContext(){
    return storage.getStore();
}