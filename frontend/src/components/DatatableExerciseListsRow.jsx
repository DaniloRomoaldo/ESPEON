/* eslint-disable react/prop-types */
import { deleteExerciseList } from "../api/exerciseLists"


export default function DatatableExerciseListsRow({list_name, qnt_exercicio, id, created_at}){
    

    function navigateTo() {
        const url = `/exercises?name_list=${encodeURIComponent(list_name)}`;
        window.open(url, "_blank"); // abre em nova aba
    }


        async function handleDelete() {
            const isConfirmed = window.confirm(`Tem certeza que deseja deletar a lista "${list_name}"?`);
        if (!isConfirmed) {
            return; 
        }
        try {
            await deleteExerciseList(id);
            window.location.reload();
            
           
        } catch (error) {
            console.error('Erro ao deletar lista:', error.message);
        }
    }
        return(
        
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th scope="row" id={id}  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <a type="button" className="hover:underline cursor-pointer" onClick={navigateTo}>
                    {list_name}
                </a>
            </th>
            <td className="px-6 py-4">
                {qnt_exercicio}
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




