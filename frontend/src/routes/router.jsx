import {Route, Routes} from "react-router-dom"
import Home from "../pages/home"
import Login from "../pages/login"
import Register from "../pages/register"
import ProtectedRoutes from "./protected/protectedRoutes"
import ExerciseLists from "../pages/registerExerciseLists"
import ViewExerciseLists from "../pages/viewExerciseLists"
import ViewExercises from "../pages/viewExercises"
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLabSessionWatcher } from '../hooks/useLabSessionWatcher';
import { useLocation } from "react-router-dom";


export default function Router (){
    const location = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (window.HSStaticMethods?.autoInit) {
                window.HSStaticMethods.autoInit();
            }
        }, 400); // aguarda o DOM montar

        return () => clearTimeout(timeout);
    }, [location.pathname]);

    // observador se existe uma sessão de laboratório ativa
    useLabSessionWatcher();

    useEffect(() => {
        const labSessionId = Cookies.get('labSessionId');

        if (!labSessionId) {
            // limpa o local Storage das listas de exercício
            localStorage.removeItem('currentLabExercises');
            localStorage.removeItem('currentExerciseIndex');
        }
    }, []);


    return(
        <>
            <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerExerciseLists" element={<ProtectedRoutes><ExerciseLists /></ProtectedRoutes>} />
            <Route path="/viewListExerciseLists" element={<ProtectedRoutes><ViewExerciseLists /></ProtectedRoutes>} />
            <Route path="/exercises" element={<ProtectedRoutes><ViewExercises /></ProtectedRoutes>} />
            <Route
                path="/home"
                element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                }
            />
        </Routes>
        </>
    )
}