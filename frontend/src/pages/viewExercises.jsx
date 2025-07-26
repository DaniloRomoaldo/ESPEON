import { useState } from 'react';
import DataTableExercises from "../layouts/DatatableExercises";
import HamburguerMenu from '../components/HamburguerMenu';
import DrawerMenu from '../components/DrawerMenu';

export default function ViewExercises(){

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return(
        
        <>
            <div className="relative h-screen flex flex-col items-center bg-gray-900 p-4 sm:p-6 md:p-8">
                
                
                <div className="absolute top-6 left-6 z-10">
                    <HamburguerMenu onOpen={() => setIsDrawerOpen(true)} />
                </div>
                
                <p className="text-gray-900 text-6xl dark:text-white">Exercícios</p>

                <div className="h-[90%] w-[80%] mt-[5%] overflow-y-auto">
                    <DataTableExercises/>
                </div>
                    
            </div>

            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    )
}