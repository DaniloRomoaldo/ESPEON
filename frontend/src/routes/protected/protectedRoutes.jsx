/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoutes({ children }) {
  const token = Cookies.get("auth_token");

  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // coleta as informaçoes do JWT

      const expTime = payload.exp * 1000; // converte ara milissegundos o tempo de expiração
      return Date.now() < expTime; // verifica se o tempo do token é valido
    } catch (error) {
      return false;
    }
  };

  if (!isTokenValid(token)) {
    Cookies.remove("auth_token"); // remove o cookie invalido
    return <Navigate to="/login" replace />;
  }

  return children;
}
