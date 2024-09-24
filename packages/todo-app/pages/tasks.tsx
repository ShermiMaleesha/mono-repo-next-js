import React from 'react';
import { useTodos } from '../services/queries/todo';
import { GenericTable } from '../components/Table';
import { TodoDataResponse } from '../services/api/todo/types';

const TasksPage = () => {
  const { data, isLoading, error } = useTodos();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  const columns: {
    key: keyof TodoDataResponse;
    label: string;
    sortable?: boolean;
    sticky?: boolean;
    width?: number;
    render?: (item: TodoDataResponse) => React.ReactNode;
  }[] = [
    { key: 'todo', label: 'Task', sortable: true, sticky: true, width:300 },
    { key: 'completed', label: 'Completed', sortable: true, sticky: false },
    { key: 'userId', label: 'User ID', sortable: true, sticky: false },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      sticky: false,
      render: () => (
        <div className="text-left">
          <button className="text-gray-500">•••</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <p className="text-lg mb-4">Here is a list of your tasks:</p>
      <GenericTable columns={columns} data={data?.todos ?? []} totalCount={data?.total || 0} />
    </div>
  );
};

export default TasksPage;
