import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../constants/queryKeys';
import { GetTodosResponse } from '../api/todo/types';
import { fetchTodos } from '../api/todo';

const useTodos = () => {
  return useQuery<GetTodosResponse, Error>({
    queryKey: [QueryKeys.TODOS],
    queryFn: fetchTodos,
  });
};

export { useTodos };
