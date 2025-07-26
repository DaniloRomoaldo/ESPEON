/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';


const StarRating = () => (
    <div className="flex items-center justify-center mb-2">
        {Array(5).fill(0).map((_, index) => (
            <svg key={index} className="w-5 h-5 text-yellow-500 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
        ))}
    </div>
)


export default function FeedbackMessage({ feedback }) {
    const [displayedText, setDisplayedText] = useState('');
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Limpa qualquer timer que possa estar rodando de um render anterior
        clearTimeout(timeoutRef.current);

        if (!feedback) {
            setDisplayedText('');
            return;
        }

        if (feedback.isCorrect) {
            setDisplayedText(feedback.response);
            return;
        }

        let index = 0;
        const fullText = '\n\n' + feedback.response;
        setDisplayedText(''); // Reseta o texto para iniciar a animação

        const typeCharacter = () => {
            if (index < fullText.length) {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                index++;
                // Agenda a próxima letra
                timeoutRef.current = setTimeout(typeCharacter, 6); 
            }
        };

        // Inicia o processo de digitação
        typeCharacter();

        // Função de limpeza: executada se o componente for atualizado ou desmontado
        return () => {
            clearTimeout(timeoutRef.current);
        };
        // -----------------------------------------------------------

    }, [feedback]); 

    if (!feedback) {
        return null;
    }

    const isCorrect = feedback.isCorrect;
    const colorClasses = isCorrect
        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        : "text-white";

    const Icon = () => (
        isCorrect ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
        ) : null
    );

    return (
        <> 
            <div className={`p-4 mt-4 text-sm rounded-lg ${colorClasses}`} role="alert">
                    {isCorrect && <StarRating />}
                <div className="flex items-start">
                    <Icon />
                    <span className="sr-only">{isCorrect ? 'Sucesso' : 'Dica'}</span>
                    <div className="ms-3 text-sm font-medium whitespace-pre-wrap">
                        {displayedText}
                    </div>
                </div>
            </div>
        </>
    );
}