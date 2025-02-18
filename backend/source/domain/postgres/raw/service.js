import * as rawRepository from './repository.js'

export const rawQuery = async (body) => {
    const {rawQuery} = body;
    //try {
        const result = await rawRepository.rawQuery(rawQuery);

        return result;

    //} catch (error) {
        
     //   throw new Error(`Service Error: ${error.message}`)
    //}
}