import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          project.status === 'active' ? 'bg-green-100 text-green-800' :
          project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {project.status}
        </span>
        <Link href={`/projects/${project.id}`} legacyBehavior>
          <a className="text-blue-600 hover:text-blue-800 font-medium">{t('view_details')}</a>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
