type TodoDataResponse = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  actions?: string
}

type GetTodosResponse = {
  todos: TodoDataResponse[]; 
  total: number; 
}

export type {TodoDataResponse,GetTodosResponse }