import React, { useState } from 'react';
import { Filter, Search, Building2, TrendingUp, AlertTriangle, X, Check } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import ProjectCard from '../components/dashboard/ProjectCard';
import { projects } from '../data/mockData';

type FilterState = {
  status: string[];
  category: string[];
  riskLevel: string[];
};

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    category: [],
    riskLevel: [],
  });
  
  // Get unique values for filter options
  const statusOptions = Array.from(new Set(projects.map(p => p.status)));
  const categoryOptions = Array.from(new Set(projects.map(p => p.category)));
  const riskOptions = Array.from(new Set(projects.map(p => p.riskLevel)));
  
  // Apply filters and search
  const filteredProjects = projects.filter(project => {
    // First apply search term if exists
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Then apply filters if any are selected
    if (filters.status.length > 0 && !filters.status.includes(project.status)) {
      return false;
    }
    
    if (filters.category.length > 0 && !filters.category.includes(project.category)) {
      return false;
    }
    
    if (filters.riskLevel.length > 0 && !filters.riskLevel.includes(project.riskLevel)) {
      return false;
    }
    
    return true;
  });
  
  const handleFilterChange = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        // Add the value
        return { ...prev, [type]: [...current, value] };
      } else {
        // Remove the value
        return { ...prev, [type]: current.filter(v => v !== value) };
      }
    });
  };
  
  const clearFilters = () => {
    setFilters({
      status: [],
      category: [],
      riskLevel: [],
    });
    setSearchTerm('');
  };
  
  const hasActiveFilters = filters.status.length > 0 || filters.category.length > 0 || filters.riskLevel.length > 0 || searchTerm !== '';
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Investment Projects"
        description="Browse and filter all your investment projects."
        actions={
          <Button 
            variant="outline"
            icon={<Filter className="h-4 w-4" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        }
      />
      
      {showFilters && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <h2 className="text-lg font-medium mb-4 sm:mb-0">Filter Projects</h2>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                icon={<X className="h-4 w-4" />}
              >
                Clear All Filters
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Project Status</h3>
              <div className="space-y-2">
                {statusOptions.map(status => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                      checked={filters.status.includes(status)}
                      onChange={() => handleFilterChange('status', status)}
                    />
                    <span className="ml-2 text-sm text-neutral-700">
                      {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Category</h3>
              <div className="space-y-2">
                {categoryOptions.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                      checked={filters.category.includes(category)}
                      onChange={() => handleFilterChange('category', category)}
                    />
                    <span className="ml-2 text-sm text-neutral-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Risk Level</h3>
              <div className="space-y-2">
                {riskOptions.map(risk => (
                  <label key={risk} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                      checked={filters.riskLevel.includes(risk)}
                      onChange={() => handleFilterChange('riskLevel', risk)}
                    />
                    <span className="ml-2 text-sm text-neutral-700">
                      {risk.charAt(0).toUpperCase() + risk.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search projects by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-neutral-600">
          Showing <span className="font-medium">{filteredProjects.length}</span> of <span className="font-medium">{projects.length}</span> projects
        </p>
        
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 border-primary-200 py-1">
                Search: {searchTerm}
                <button 
                  onClick={() => setSearchTerm('')}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {filters.status.map(status => (
              <Badge key={`status-${status}`} className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 border-primary-200 py-1">
                Status: {status === 'in-progress' ? 'In Progress' : status}
                <button 
                  onClick={() => handleFilterChange('status', status)}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {filters.category.map(category => (
              <Badge key={`category-${category}`} className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 border-primary-200 py-1">
                Category: {category}
                <button 
                  onClick={() => handleFilterChange('category', category)}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {filters.riskLevel.map(risk => (
              <Badge key={`risk-${risk}`} className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 border-primary-200 py-1">
                Risk: {risk}
                <button 
                  onClick={() => handleFilterChange('riskLevel', risk)}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects found</h3>
          <p className="text-neutral-600 mb-6">
            No projects match your current filters. Try adjusting your search criteria.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;