import { GoogleGenerativeAI } from '@google/generative-ai';
import { systemPrompt } from './prompts/systemPrompt.js';
import { userPrompt } from './prompts/userPrompt.js';
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function callGeminiApi(validationContext, exerciseDescription) {

    try {
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash-latest"});

        let systemContent = systemPrompt
            .replace('{exerciseDescription}', exerciseDescription)
            .replace('{solutionQuery}', validationContext.solutionQuery)
            .replace('{studentQuery}', validationContext.studentQuery)
            .replace('{rowCountValidation}', validationContext.rowCountValidation)
            .replace('{columnNamesValidation}', validationContext.columnNamesValidation)
            .replace('{contentValidation}', validationContext.contentValidation);


        const chat = model.startChat({
            history:[
                {
                    role: "user",
                    parts: [{text: systemContent }],
                },
                {
                    role: "model",
                    parts: [{text: "Entendido. Estou pronto para analisar a query do aluno e gerar a dica." }]
                },
            ],
            generationConfig:{
                maxOutputTokens: 350,
            },
        });


        const result = await chat.sendMessage(userPrompt(validationContext.studentQuery));
        const response = result.response;
        const text = response.text();

        return text;

    } catch (error) {
        
        return "Oops! Não consegui gerar uma dica agora. Verifique se sua query tem erros de sintaxe e tente comparar o número de linhas e colunas com o resultado esperado.";
    }
    
}



