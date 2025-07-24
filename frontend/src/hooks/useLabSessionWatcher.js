import { useEffect } from 'react';
import Cookies from 'js-cookie';


const CHECK_INTERVAL = 15000; 

export function useLabSessionWatcher() {
    useEffect(() => {
 
        let wasInLabSession = !!Cookies.get('labSessionId');

        const intervalId = setInterval(() => {
            const isInLabSessionNow = !!Cookies.get('labSessionId');

            if (wasInLabSession && !isInLabSessionNow) {
                
                localStorage.removeItem('currentLabExercises');
                localStorage.removeItem('currentExerciseIndex');

                clearInterval(intervalId);

                alert("Sua sessão de laboratório expirou. Você foi redirecionado para o ambiente Sandbox.");
                window.location.reload();
            }

            wasInLabSession = isInLabSessionNow;

        }, CHECK_INTERVAL);

        return () => clearInterval(intervalId);
    }, []); 
}