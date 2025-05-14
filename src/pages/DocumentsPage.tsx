import React, { useState } from 'react';
import { Search, Filter, X, FileText } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import DocumentCard from '../components/documents/DocumentCard';
import { documents } from '../data/mockData';
import Badge from '../components/ui/Badge';

type DocumentFilters = {
  category: string[];
  projectId: string[];
};

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<DocumentFilters>({
    category: [],
    projectId: [],
  });
  
  // Get unique categories and projects
  const categoryOptions = Array.from(new Set(documents.map(d => d.category)));
  const projectOptions = Array.from(new Set(documents.map(d => d.projectId)));
  
  // Get project names by ID
  const projectNames: Record<string, string> = {
    '1': 'Oceanview Residences',
    '2': 'Green Energy Fund',
    '3': 'TechVenture Startups',
    '4': 'Midtown Office Complex',
    '5': 'BioTech Innovation Fund',
  };
  
  // Apply filters
  const filteredDocuments = documents.filter(doc => {
    // Apply search
    if (searchTerm && !doc.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !doc.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (filters.category.length > 0 && !filters.category.includes(doc.category)) {
      return false;
    }
    
    // Apply project filter
    if (filters.projectId.length > 0 && !filters.projectId.includes(doc.projectId)) {
      return false;
    }
    
    return true;
  });
  
  const handleFilterChange = (type: keyof DocumentFilters, value: string) => {
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
      category: [],
      projectId: [],
    });
    setSearchTerm('');
  };
  
  const hasActiveFilters = filters.category.length > 0 || filters.projectId.length > 0 || searchTerm !== '';
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'report': return 'Financial Report';
      case 'presentation': return 'Presentation';
      case 'legal': return 'Legal Document';
      default: return 'Other';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Documents Repository"
        description="Access and download project-related documents, reports, and presentations."
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
            <h2 className="text-lg font-medium mb-4 sm:mb-0">Filter Documents</h2>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Document Type</h3>
              <div className="space-y-2">
                {categoryOptions.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                      checked={filters.category.includes(category)}
                      onChange={() => handleFilterChange('category', category)}
                    />
                    <span className="ml-2 text-sm text-neutral-700">
                      {getCategoryLabel(category)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Project</h3>
              <div className="space-y-2">
                {projectOptions.map(projectId => (
                  <label key={projectId} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                      checked={filters.projectId.includes(projectId)}
                      onChange={() => handleFilterChange('projectId', projectId)}
                    />
                    <span className="ml-2 text-sm text-neutral-700">
                      {projectNames[projectId] || `Project ${projectId}`}
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
              placeholder="Search documents by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-neutral-600">
          Showing <span className="font-medium">{filteredDocuments.length}</span> of <span className="font-medium">{documents.length}</span> documents
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
            
            {filters.category.map(category => (
              <Badge key={`category-${category}`} className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 border-primary-200 py-1">
                Type: {getCategoryLabel(category)}
                <button 
                  onClick={() => handleFilterChange('category', category)}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {filters.projectId.map(projectId => (
              <Badge key={`project-${projectId}`} className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 border-primary-200 py-1">
                Project: {projectNames[projectId] || `Project ${projectId}`}
                <button 
                  onClick={() => handleFilterChange('projectId', projectId)}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
          <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No documents found</h3>
          <p className="text-neutral-600 mb-6">
            No documents match your current filters. Try adjusting your search criteria.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;