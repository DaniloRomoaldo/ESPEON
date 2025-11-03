/* eslint-disable no-unused-vars */
import { api } from "../lib/axios";

export async function getListNames() {
  try {
    const lists = await api.get("getAllExListsRegistered");
    return lists.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getDistinctExercises() {
  try {
    const response = await api.get("/getExercisesNamesInLog");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar nomes dos exercícios."
    );
  }
}

export async function getDistinctUsers() {
  try {
    const response = await api.get("/getUsersInLog");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar usuários no log."
    );
  }
}

export async function getLogReportData(filters) {
  const params = {
    listNames: filters.list_names, // Exemplo de mapeamento
    exercisesNames: filters.exercise_names,
    userEmails: filters.user_emails,
    dateStart: filters.startDate,
    dateEnd: filters.endDate,
  };

  try {
    const response = await api.post("/report/activity-log", params);
    return response.data; // Retorna os dados para o useQuery
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar dados do relatório."
    );
  }
}

export async function getUserAnswersLog(params) {
  const body = {
    list_name: params.list_name,
    exercise_name: params.exercise_name,
    user_email: params.user_email,
  };

  try {
    const response = await api.post("/report/answers-log", body);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar dados.");
  }
}
