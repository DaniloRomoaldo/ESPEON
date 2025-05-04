import {Route, Routes} from "react-router-dom"
import Home from "../pages/home"
import Login from "../pages/login"
import Register from "../pages/register"
import ProtectedRoutes from "./protected/protectedRoutes"
import ExerciseLists from "../pages/registerExerciseLists"
import ViewExerciseLists from "../pages/viewExerciseLists"
import ViewExercises from "../pages/viewExercises"

export default function Router (){
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