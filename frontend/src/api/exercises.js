import { api } from "../lib/axios";
import Cookies from "js-cookie";


export default async function listAllExercices({ list_name }) {
  const queryParams = new URLSearchParams({ name_list: list_name }).toString();
  const userId = Cookies.get("userId");


  try {
    const response = await api.get(`exercises?${queryParams}`,{
      headers:{
        "user_id": userId || "",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteExercise({ exercise_name }) {
  const queryParams = new URLSearchParams({ name: exercise_name }).toString();
  const userId = Cookies.get("userId");
  try {
    const response = await api.delete(`exercise?${queryParams}`, {
      headers:{
        "user_id": userId || "",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
