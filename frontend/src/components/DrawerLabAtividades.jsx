/* eslint-disable react/prop-types */
import { stopLab, checkAnswer } from '../api/labManager';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import FeedbackMessage from './FeedbackMessage';



export default function DrawerLabAtividades({ isOpen, onClose, editorContent }) { 

    
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const currentExercise = exercises[currentIndex];



    useEffect(() => {
        const labSessionId = Cookies.get('labSessionId');
        if (labSessionId) {
            const loadedExercises = localStorage.getItem('currentLabExercises');
            const loadedIndex = localStorage.getItem('currentExerciseIndex');

            if (loadedExercises) {
                setExercises(JSON.parse(loadedExercises));
            }
            if (loadedIndex) {
                setCurrentIndex(parseInt(loadedIndex, 10));
            }
        }
    }, [isOpen]);

    useEffect(() => {
        setFeedback(null);
    }, [currentIndex]);


    const handleSubmitAnswer = async () => {
        if (!currentExercise || !editorContent.trim()) {
            alert("Por favor, escreva sua resposta no editor antes de submeter.");
            return;
        }
        setIsSubmitting(true);
        setFeedback(null);

        try {
            const body = {
                studentQuery: editorContent,
                solutionQuery: currentExercise.solution_query,
                exerciseDescription: currentExercise.description
            };

            console.log(body)
            const result = await checkAnswer(body);

            setFeedback(result);


        } catch (error) {
            console.log(`Erro ao submeter: ${error.message}`);
        } finally {
            setIsSubmitting(false); // Desativa o loading
        }


    };
    

    const handleNextExercise = () => {
        const nextIndex = (currentIndex + 1) % exercises.length; 
        setCurrentIndex(nextIndex);
        localStorage.setItem('currentExerciseIndex', nextIndex.toString());
    };


    const handleStopLab = async () => {
        const sessionId = Cookies.get('labSessionId');
        if (!sessionId) return;

        const isConfirmed = window.confirm("Tem certeza que deseja encerrar a sessão do laboratório? O ambiente será destruído.");
        
        if (isConfirmed) {
            try {
                await stopLab(sessionId);
                alert("Laboratório encerrado com sucesso!");
            } catch (error) {
                alert(`Ocorreu um erro ao encerrar a sessão: ${error.message}`);
            } finally {
                Cookies.remove('labSessionId');
                localStorage.removeItem('currentLabExercises');
                localStorage.removeItem('currentExerciseIndex');
                window.location.reload();
            }
        }
    };

    const labSessionId = Cookies.get('labSessionId');

    return (
        <div 
            id="drawer-example" 
            className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-300 ease-in-out bg-white w-80 dark:bg-[#16181f] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            tabIndex="-1" 
            aria-labelledby="drawer-label"
        >
            <h5 id="drawer-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                {currentExercise ? currentExercise.name_list : 'Laboratório de Atividades'}
            </h5>
            
            <button 
                type="button" 
                onClick={onClose} 
                aria-controls="drawer-example" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close menu</span>
            </button>

           {labSessionId && currentExercise ? (
                <div>
                    <h6 className="text-lg font-bold dark:text-white">{currentExercise.name}</h6>
                    <p className="mb-6 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {currentExercise.description}
                    </p>
                </div>
            ) : (
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Nenhuma sessão de laboratório ativa. Inicie um laboratório na página de Listas de Exercícios!
                </p>
            )}
        
            {labSessionId && (
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={handleSubmitAnswer}
                        disabled={isSubmitting}
                        className="w-full justify-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                        {isSubmitting ? 'Avaliando...' : 'Submit Answer'}
                    </button>

                    <button
                        onClick={handleNextExercise}
                        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Next Quest
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={handleStopLab}
                        className="col-span-2 w-full justify-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                    >
                        Quit Lab
                    </button>
                </div>
            )}
            <FeedbackMessage feedback={feedback} />
            
        </div>
    );
}

