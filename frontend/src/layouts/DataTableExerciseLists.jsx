import DatatableExerciseListsRow from "../components/DatatableExerciseListsRow"
import { listAllExerciceLists } from "../api/exerciseLists"
import { useEffect, useState } from "react"

export default function DataTable(){
    const [exerciseLists, setExerciseLists] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await listAllExerciceLists();
            setExerciseLists(data);
        }
        fetchData();
    }, []);


    return(

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-600">
            <table className="w-[98%] justify-self-center mt-2 mb-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Lista de Exercício
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantidade Exercícios
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Criado em
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Deletar
                        </th>
                    </tr>
                </thead>
                <tbody>
                {exerciseLists.map((item, index) => (
                        <DatatableExerciseListsRow
                            key={item.id} 
                            index={index}
                            id={item.id}
                            list_name={item.name}
                            qnt_exercicio={item.qnt_exercicios}
                            created_at={item.created_at.split('T')[0]}
                        />
                    ))}
                </tbody>
            </table>
        </div>

    )
}