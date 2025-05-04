/* eslint-disable react/prop-types */
import { deleteExercise } from "../api/exercises"

export default function DatatableExercisesRow({name, description, solution_query, created_at}){

    async function handleDelete(){
        const isConfirmed = window.confirm(`Tem certeza que deseja deletar o Exercício "${name}"?`);
        if (!isConfirmed){
            return;
        }

        try {
            await deleteExercise({ exercise_name: name });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao deletar exercicio', error.message);
        }
    }

    return(
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
            <td className="px-6 py-4">
                {description}
            </td>
            <td className="px-6 py-4">
                {solution_query}
            </td>
            <td className="px-6 py-4">
                {created_at}
            </td>
            <td className="px-6 py-4">
                <a type="button" onClick={handleDelete} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer ">Remove</a>
            </td>
        </tr>
    )
}