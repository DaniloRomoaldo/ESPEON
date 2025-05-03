import DataTable from "../components/DataTable"

export default function ViewExerciseLists(){
    return(
        <div className="h-screen flex flex-col items-center bg-gray-900 p-4 sm:p-6 md:p-8">
            
            <p className="text-gray-900 text-6xl dark:text-white">Lista de Exercícios</p>

                <div className="h-[90%] w-[70%] mt-[5%]">
                    <DataTable />
                </div>
                
        </div>
    )
}