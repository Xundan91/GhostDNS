'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Settings, Search, Globe, ExternalLink } from 'lucide-react';

interface ProjectSelectionStepProps {
  configurationData: {
    service: 'vercel' | 'netlify' | '';
    apiKey: string;
    selectedProject: {
      id: string;
      name: string;
      url: string;
    } | null;
  };
  updateConfigurationData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface Project {
  id: string;
  name: string;
  url: string;
  framework?: string;
  updatedAt?: string;
}

const ProjectSelectionStep: React.FC<ProjectSelectionStepProps> = ({
  configurationData,
  updateConfigurationData,
  onNext,
  onPrev
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (configurationData.service && configurationData.apiKey) {
      fetchProjects();
    }
  }, [configurationData.service, configurationData.apiKey]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/integrations/vercel/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: configurationData.apiKey,
          service: configurationData.service
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = (project: Project) => {
    updateConfigurationData({
      selectedProject: {
        id: project.id,
        name: project.name,
        url: project.url
      }
    });
  };

  const handleNext = () => {
    if (configurationData.selectedProject) {
      onNext();
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 mb-4">
          <Settings className="w-8 h-8 text-accent-light dark:text-accent-dark" />
        </div>
        <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-2">
          Select Your Project
        </h2>
        <p className="text-accent-light/60 dark:text-accent-dark/60">
          Choose the project you want to connect to your domain
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-light/40 dark:text-accent-dark/40" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 transition-all duration-300"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={fetchProjects}
            className="mt-2 text-sm text-red-500 hover:text-red-400 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-light dark:border-accent-dark mx-auto"></div>
          <p className="mt-4 text-accent-light/60 dark:text-accent-dark/60">Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <Globe className="w-12 h-12 text-accent-light/40 dark:text-accent-dark/40 mx-auto mb-4" />
          <p className="text-accent-light/60 dark:text-accent-dark/60">
            {searchQuery ? 'No projects found matching your search' : 'No projects found'}
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                configurationData.selectedProject?.id === project.id
                  ? 'border-accent-light dark:border-accent-dark bg-accent-light/10 dark:bg-accent-dark/10'
                  : 'border-accent-light/20 dark:border-accent-dark/20 hover:border-accent-light/40 dark:hover:border-accent-dark/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-1 truncate">
                    {project.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-accent-light/60 dark:text-accent-dark/60">
                    <span className="truncate">{project.url}</span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-shrink-0 p-1 rounded hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  {project.framework && (
                    <p className="text-xs text-accent-light/40 dark:text-accent-dark/40 mt-1">
                      Framework: {project.framework}
                    </p>
                  )}
                  {project.updatedAt && (
                    <p className="text-xs text-accent-light/40 dark:text-accent-dark/40">
                      Updated: {formatDate(project.updatedAt)}
                    </p>
                  )}
                </div>
                {configurationData.selectedProject?.id === project.id && (
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-6 h-6 rounded-full bg-accent-light dark:bg-accent-dark flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-light dark:bg-primary-dark"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={onPrev}
          className="flex items-center space-x-2 px-6 py-3 border border-accent-light/20 dark:border-accent-dark/20 text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 rounded-lg font-semibold transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!configurationData.selectedProject}
          className="flex items-center space-x-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProjectSelectionStep; 
 