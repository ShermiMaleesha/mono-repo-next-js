import apiClient from "../../apiClient";
import { GetTodosResponse } from "./types";

const fetchTodos = async (): Promise<GetTodosResponse> => {
  const response = await apiClient.get<GetTodosResponse>('/todos');
  return response.data;
};

export { fetchTodos };

