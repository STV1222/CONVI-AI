import React from 'react';
import { useTranslation } from 'next-i18next';

interface Worker {
  id: string;
  name: string;
  role: string;
  skills: string[];
  available: boolean;
}

interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          worker.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {worker.available ? t('available_workers') : 'Busy'}
        </span>
      </div>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">{t('role')}:</span> {worker.role}
      </p>
      <div className="mb-4">
        <span className="font-semibold text-gray-700 block mb-1">{t('skills')}:</span>
        <div className="flex flex-wrap gap-2">
          {worker.skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
