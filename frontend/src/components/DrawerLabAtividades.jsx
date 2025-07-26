/* eslint-disable react/prop-types */
import { stopLab, checkAnswer } from '../api/labManager';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import FeedbackMessage from './FeedbackMessage';
import ConfirmationModal from './ConfirmationModal';



export default function DrawerLabAtividades({ isOpen, onClose, editorContent }) { 

    
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const currentExercise = exercises[currentIndex];

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        message: '',
        action: null
    });



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
        try {
            await stopLab(sessionId);
        } catch (error) {
            alert(`Ocorreu um erro ao encerrar a sessão: ${error.message}`);
        } finally {
            Cookies.remove('labSessionId');
            localStorage.removeItem('currentLabExercises');
            localStorage.removeItem('currentExerciseIndex');
            window.location.reload();
        }
    };

    // 4. Função genérica que o modal vai chamar
    const handleConfirmAction = () => {
        if (modalConfig.action === 'stop') {
            handleStopLab();
        }
    };

    const labSessionId = Cookies.get('labSessionId');

    return (
     <>
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
                        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                Avaliando...
                            </>
                        ) : (
                            'Submit Answer'
                        )}
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
                            onClick={() => setModalConfig({ isOpen: true, action: 'stop', message: 'Tem certeza que deseja encerrar a sessão do laboratório? O ambiente será destruído.' })}
                            className="col-span-2 w-full justify-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                        >
                            Quit Lab
                        </button>
                    
                </div>
            )}
            <FeedbackMessage feedback={feedback} />
            
        </div>

        <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ isOpen: false, action: null, message: '' })}
                onConfirm={handleConfirmAction}
                message={modalConfig.message}
                confirmText="Sim, encerrar"
                confirmColor="red"
        />
    </>
    );
}

