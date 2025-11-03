import * as repositoryLogRegister from "./repository.js";

export const registerLog = async (body) => {
  const logRegister = {
    list_name: body.list_name,
    exercise_name: body.exercise_name,
    exercise_solution: body.exercise_solution,
    user_response: body.user_response,
    response_evaluation: body.response_evaluation,
    user_email: body.user_email,
  };

  await repositoryLogRegister.create(logRegister);
};

export const getExerciseLists = async () => {
  return await repositoryLogRegister.getExerciseLists();
};

export const getExercisesNames = async () => {
  return await repositoryLogRegister.getExercisesNames();
};

export const getUsersLog = async () => {
  return await repositoryLogRegister.getUsersLog();
};

// Registro de respostas de um aluno
export const generateActivityReport = async (body) => {
  const reportData = await repositoryLogRegister.getAggregatedLogReport(body);
  return reportData;
};

export const getUserAnswersByExercise = async (body) => {
  const answers = await repositoryLogRegister.getUserAnswersByExercise(body);
  return answers;
};
