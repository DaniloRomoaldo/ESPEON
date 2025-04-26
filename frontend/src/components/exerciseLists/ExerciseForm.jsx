/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';


export default function ExerciseForm ({index, onChange}){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [solutionQuery, setSolutionQuery] = useState('');

    useEffect(() => {
        onChange(index, {
          name, 
          description,
          solution_query: solutionQuery, 
        });
      }, [name, description, solutionQuery]); 
      

    return (
        <div className="w-full">
            <div>
                <label htmlFor="text" className="block text-xs sm:text-sm text-white opacity-30 font-extralight mt-2">
                    Título do Exercício
                </label>
                    <div className="mt-1 mb-2 ">
                        <input
                                id="exerciseTitle"
                                type="text"
                                required
                                placeholder="Exemplo: Exercício 1"
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full bg-[rgba(217,217,217,0.1)] rounded-sm text-neutral-300 h-8 sm:h-10 px-2 sm:px-3 placeholder-gray-600"
                        />
                    </div>
            </div>
            <div>
                <label  htmlFor="descriptio" className="block text-xs sm:text-sm text-white opacity-30 font-extralight mt-2">
                    Descrição
                </label>
                <textarea 
                    id="description" 
                    rows="4" 
                    className="block p-2.5 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-[rgba(217,217,217,0.1)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                <label htmlFor="message" className="block text-xs sm:text-sm text-white opacity-30 font-extralight mt-2">
                    Gabarito
                </label>
                <textarea 
                    id="gabarito" 
                    rows="4" 
                    className="block p-2.5 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-[rgba(217,217,217,0.1)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setSolutionQuery(e.target.value)}
                    ></textarea>
            
            
            </div>

        </div>
    )
}