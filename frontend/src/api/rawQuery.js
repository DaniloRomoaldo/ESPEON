import { api } from "../lib/axios";

export async function rawQuery(query) {
  try {
    const response = await api.post("rawQuery", { rawQuery: query });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
