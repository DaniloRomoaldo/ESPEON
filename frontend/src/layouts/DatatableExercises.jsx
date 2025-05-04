import DatatableExercisesRow from "../components/DatatableExercicesRow"
import listAllExercices from "../api/exercises"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function DataTableExercises(){
    const [exercises, setExercices] = useState([])
    const [searcParams] = useSearchParams();
    const listName = searcParams.get("name_list")

    useEffect(()=>{
        async function fetchData() {
            const data = await listAllExercices({list_name: listName})
            setExercices(data)
        }
        fetchData()
    }, [listName]);

    
    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-600 ">
            <table className="w-[98%] justify-self-center  mt-2 mb-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Questão
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descrição
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Solução
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
                    {exercises.map((item, index) => (
                        <DatatableExercisesRow 
                        key={item.id}
                        index={index}
                        id={item.id} 
                        name = {item.name} 
                        description = {item.description}
                        solution_query = {item.solution_query}
                        created_at = {item.created_at.split('T')[0]}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}