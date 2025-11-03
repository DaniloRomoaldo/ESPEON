import { databaseESPEON } from "../../../kenx/knexfile.js";

export const findByEmail = async (email) => {
  return databaseESPEON.select().from("users").where({ email: email }).first();
};
