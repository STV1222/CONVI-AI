import React from 'react';
import { useTranslation } from 'next-i18next';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h4>
      <p className="text-gray-600 mb-3 text-sm">{task.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className={`px-2 py-1 rounded-full ${
          task.status === 'completed' ? 'bg-green-100 text-green-800' :
          task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {task.status}
        </span>
        {task.assignedTo && (
          <span className="text-gray-500">
            {t('assigned_to')}: {task.assignedTo}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
