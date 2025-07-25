import { rawQuery } from "../../postgres/raw/repository.js";
import { callGeminiApi } from "./gemini/geminiApi.js";


const createRowFingerprint = (row) => {
    const sortedRow = {};
    // pega as chaves do objeto e bota em ordem alfabética
    Object.keys(row).sort().forEach(key => {
        sortedRow[key] = row[key];
    });

    // Converte o objeto para uma string que é a impressão digital do resultado
    return JSON.stringify(sortedRow)
}


export const analiseAnswer = async (body) => {
    
    const {studentQuery, solutionQuery, exerciseDescription} = body;

    const validationContext = {
        studentQuery: studentQuery,
        solutionQuery: solutionQuery,
    };
    


    const [resultStudentQuery, resultSolutionQuery] = await Promise.all([
        rawQuery(studentQuery), rawQuery(solutionQuery)
    ]);

    const studentRows = resultStudentQuery.rows;
    const solutionRows = resultSolutionQuery.rows;


    //---- 1° verificação da contagem de linhas de cada query
    validationContext.studentRowCount = studentRows.length;
    validationContext.solutionRowCount = solutionRows.length;
    validationContext.rowCountValidation = (studentRows.length === solutionRows.length);

    //----- 2° verificando quantidade de colunas e Nomes das colunas
    if (studentRows.length > 0 && solutionRows.length > 0){
        const studentColumns = Object.keys(studentRows[0]).sort();
        const solutionColumns = Object.keys(solutionRows[0]).sort();

        validationContext.studentColumns = studentColumns;
        validationContext.solutionColumns = solutionColumns;
        validationContext.columnNamesValidation = (studentColumns.join(',') === solutionColumns.join(','));

    } else if (studentRows.length === 0 && solutionRows.length === 0) {
        // ambos não tem linhas
        validationContext.columnNamesValidation = true;
    } else {
        // se a qantidade de linhas ou colunas não batem
        validationContext.columnNamesValidation = false;
    }

        
    //---- 3° verificação do conteúdo
    // Essa verificação só é necessária se as duas primeiras forem verdadeiras, é um check custoso
    if (validationContext.rowCountValidation && validationContext.columnNamesValidation && studentRows.length >0){

        // Cria um set com as impressões únicas do gabarito
        const solutionFingerprints = new Set(solutionRows.map(createRowFingerprint));

        // verifica se todas as linhas do aluno existem no conjunto de impressões do gabarito
        const allStudentRowsValidation = studentRows.every(studentRow => {
            const studentFingerprint = createRowFingerprint(studentRow);
            return solutionFingerprints.has(studentFingerprint);
        });
        
        validationContext.contentValidation = allStudentRowsValidation;
    }else{
        
        // Se as verificações anteriores falharam, o conteúdo também falha por consequência.
        // Ou se não há linhas, o conteúdo é considerado "igual".
        validationContext.contentValidation = validationContext.rowCountValidation && validationContext.columnNamesValidation;

    }


        //----  ESTAPA DE RESPOSTA

        const isCorrect = validationContext.rowCountValidation && validationContext.columnNamesValidation && validationContext.contentValidation;


        let responseMessage;

        if (isCorrect){
            responseMessage = "Parabéns, sua resposta está CORRETA! ✅"
        } else {
            // pegar as informações do exercício

            responseMessage = await callGeminiApi(validationContext, exerciseDescription);
        }

        return {
            isCorrect: isCorrect,
            response: responseMessage
        };



}