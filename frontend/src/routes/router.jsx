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

export default function Router (){

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
            <Route path="/registerExerciseLists" element={<ExerciseLists />} />
            <Route path="/viewListExerciseLists" element={<ViewExerciseLists />} />
            <Route path="/exercises" element={<ViewExercises />} />
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