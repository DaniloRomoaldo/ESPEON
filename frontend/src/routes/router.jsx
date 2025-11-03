import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ProtectedRoutes from "./protected/protectedRoutes";
import ExerciseLists from "../pages/registerExerciseLists";
import ViewExerciseLists from "../pages/viewExerciseLists";
import ViewExercises from "../pages/viewExercises";
import Cookies from "js-cookie";
import LogAnswers from "../pages/logReportAnswers";
import { useEffect } from "react";
import { useLabSessionWatcher } from "../hooks/useLabSessionWatcher";
import { useLocation } from "react-router-dom";

export default function Router() {
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.HSStaticMethods?.autoInit) {
        window.HSStaticMethods.autoInit();
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  useLabSessionWatcher();

  useEffect(() => {
    const labSessionId = Cookies.get("labSessionId");

    if (!labSessionId) {
      localStorage.removeItem("currentLabExercises");
      localStorage.removeItem("currentExerciseIndex");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/registerExerciseLists"
          element={
            <ProtectedRoutes>
              <ExerciseLists />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/viewListExerciseLists"
          element={
            <ProtectedRoutes>
              <ViewExerciseLists />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/exercises"
          element={
            <ProtectedRoutes>
              <ViewExercises />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/logReportAnswers"
          element={
            <ProtectedRoutes>
              <LogAnswers />
            </ProtectedRoutes>
          }
        />
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
  );
}
