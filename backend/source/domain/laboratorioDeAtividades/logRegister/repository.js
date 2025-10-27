import { databaseESPEON } from "../../../kenx/knexfile.js";

export const create = async (logRegister) => {
  await databaseESPEON("log_exercise_list").insert({
    list_name: logRegister.list_name,
    exercise_name: logRegister.exercise_name,
    exercise_solution: logRegister.exercise_solution,
    user_response: logRegister.user_response,
    response_evaluation: logRegister.response_evaluation,
    user_email: logRegister.user_email,
    created_at: new Date(),
  });
};

// primeiro, pegar todas as listas únicas no log
export const getExerciseLists = async () => {
  return await databaseESPEON("log_exercise_list").distinct("list_name");
};

// todos os nomes de exercícios no log
export const getExercisesNames = async () => {
  return await databaseESPEON("log_exercise_list").distinct("exercise_name");
};

export const getUsersLog = async () => {
  return await databaseESPEON("log_exercise_list").distinct("user_email");
};


// terceiro, pegar todas as respsotas de um aluno em uma questão
export const generateActivityReport = async (
  list_name,
  exercise_name,
  user_email,
  startDate,
  endDate
) => {
  const filters = {
    list_name: list_name,
    exercise_name: exercise_name,
    user_email: user_email,
  };

  return await databaseESPEON("log_exercise_list")
    .select(
      "user_email",
      "exercise_name",
      "exercise_solution",
      "user_response",
      "response_evaluation",
      databaseESPEON.raw("created_at::date")
    )
    .whereBetween(databaseESPEON.raw("created_at::date"), [startDate, endDate])
    .where(filters)
    .orderBy("created_at", "desc");
};

export const getAggregatedLogReport = async (filters) => {
  const { listNames, exercisesNames, userEmails, dateStart, dateEnd } = filters;

  let query = databaseESPEON("log_exercise_list").select(
    "list_name",
    "exercise_name",
    "user_email",
    databaseESPEON.raw(
      "MAX(CASE WHEN response_evaluation = TRUE THEN 1 ELSE 0 END) AS acertos"
    ),
    databaseESPEON.raw(
      "SUM(CASE WHEN response_evaluation = FALSE THEN 1 ELSE 0 END) AS erros"
    )
  )
  .groupBy("list_name", "exercise_name", "user_email")
  .orderBy([
      { column: "user_email" },
      { column: "list_name" },
      { column: "exercise_name" },
    ]);

    // verifica se as datas são vazias ou nulas
  if (dateStart && dateEnd && dateStart !== '' && dateEnd !== '') {
    query = query.whereBetween(databaseESPEON.raw('created_at::date'), [dateStart, dateEnd]);
  }else if (dateStart && dateStart !== '') { // mais que data de início
    query = query.where(databaseESPEON.raw('created_at::date'), '>=', dateStart);
  } else if (dateEnd && dateEnd !== '') { // menor que data limite
    query = query.where(databaseESPEON.raw('created_at::date'), '<=', dateEnd);
  }

  // filtro do nome da lista de exercícios
  if (listNames && listNames.length > 0) {
    query = query.whereIn("list_name", listNames);
  }

  // Filtro dos Nomes dos Exercícios
  if (exercisesNames && exercisesNames.length > 0) {
    query = query.whereIn("exercise_name", exercisesNames);
  }

  // Filtro dos Usuários
  if (userEmails && userEmails.length > 0) {
    query = query.whereIn("user_email", userEmails);
  }

  // Executa a query
  try {
    const result = await query;
    return result;
  } catch (error) {
    throw new Error("Falha ao buscar o relatório agregado.");
  }

};
