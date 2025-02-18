import { databaseSHIP } from "../../../kenx/knexfile.js";

export const findByEmail = async (email) => {
    return databaseSHIP.select().from('users').where({email:email}).first()
}