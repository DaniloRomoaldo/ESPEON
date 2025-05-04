import DataTableExercises from "../layouts/DatatableExercises"

export default function ViewExercises(){
    return(
        <div className="h-screen flex flex-col items-center bg-gray-900 p-4 sm:p-6 md:p-8">
            
            <p className="text-gray-900 text-6xl dark:text-white">Exercícios</p>

                <div className="h-[90%] w-[80%] mt-[5%] overflow-y-auto">
                    <DataTableExercises/>
                </div>
                
        </div>
    )
}