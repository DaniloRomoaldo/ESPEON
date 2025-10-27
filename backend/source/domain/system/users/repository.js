import { databaseESPEON } from "../../../kenx/knexfile.js";

// Métodos GET
export const findAll = async () => {
  return databaseESPEON.select("id", "email").from("users");
};

export const getOne = async (id) => {
  return databaseESPEON
    .select("id", "email")
    .from("users")
    .where({ id: id })
    .first();
};

export const findByEmail = async (email) => {
  return databaseESPEON
    .select("id", "email")
    .from("users")
    .where({ email: email });
};

// Método POST

export const create = async (user) => {
  await databaseESPEON("users").insert({
    email: user.email,
    password: user.password,
  });
};

// Método PUT & PATCH

export const update = async (id, user) => {
  await databaseESPEON("users").where({ id: id }).update({
    email: user.email,
    password: user.password,
  });
};

// Método DELETE

export const destroy = async (id) => {
  await databaseESPEON.transaction(async (trx) => {
    await trx("user_permission").where({ user_id: id }).del();

    await trx("users").where({ id: id }).del();
  });
};
