import { databaseESPEON } from "../../../kenx/knexfile.js";

// Métodos GET
export const findAll = async () => {
  return databaseESPEON("user_permission").select();
};

export const findById = async (id) => {
  return databaseESPEON("user_permission").select().where({ id: id });
};

export const findByUserId = async (user_id) => {
  return databaseESPEON
    .select(databaseESPEON.ref("name").as("permission"))
    .from("user_permission")
    .join("users", "users.id", "user_permission.user_id")
    .join("permissions", "permissions.id", "user_permission.permission_id")
    .where("users.id", "=", user_id)
    .orderBy("name", "asc");
};

export const findByPermissionId = async (permission_id) => {
  return databaseESPEON
    .select(databaseESPEON.ref("email").as("user"))
    .from("user_permission")
    .join("users", "users.id", "user_permission.user_id")
    .join("permissions", "permissions.id", "user_permission.permission_id")
    .where("permissions.id", "=", permission_id);
  //       .orderBy('email', 'asc')
};

// Método POST
export const create = async (user_permission) => {
  await databaseESPEON("user_permission").insert({
    user_id: user_permission.user_id,
    permission_id: user_permission.permission_id,
  });
};

// Método DELETE
export const destroy = async (id) => {
  await databaseESPEON("user_permission").where({ id: id }).del();
};

export const findPermissionByUserId = async (userId) => {
  return databaseESPEON
    .select("permissions.name as permission_name")
    .from("user_permission")
    .join("permissions", "permissions.id", "user_permission.permission_id")
    .where("user_permission.user_id", "=", userId)
}