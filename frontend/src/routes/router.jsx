import {Route, Routes} from "react-router-dom"
import Home from "../pages/home"
import Login from "../pages/login"
import Register from "../pages/register"
import ProtectedRoutes from "./protected/protectedRoutes"
import ExerciseLists from "../pages/exerciseLists"

export default function Router (){
    return(
        <>
            <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/exerciseLists" element={<ExerciseLists />} />
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