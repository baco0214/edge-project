import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';
import Button from '../ui/Button';
import { Project } from '../../types';
import { formatCurrency, formatPercent, getProgressColor } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  
  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'planning': return 'primary';
      case 'in-progress': return 'secondary';
      case 'completed': return 'success';
      case 'on-hold': return 'warning';
      default: return 'default';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-progress': return 'In Progress';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  return (
    <Card hover className="h-full flex flex-col transition-all duration-300">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
          <h3 className="text-white text-lg font-semibold drop-shadow-sm">{project.title}</h3>
          <Badge variant={getStatusBadgeVariant(project.status)}>
            {getStatusLabel(project.status)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{project.description}</p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-neutral-700">Progress</span>
              <span className="text-sm font-medium text-neutral-700">{project.progress}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div
                className={`${getProgressColor(project.progress)} h-2.5 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Investment</p>
              <p className="text-base font-semibold text-neutral-900">{formatCurrency(project.investmentAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">ROI</p>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-success-600 mr-1" />
                <p className="text-base font-semibold text-success-700">{formatPercent(project.roi)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Badge variant="outline" size="sm">
              {project.category}
            </Badge>
            <Badge variant={getRiskBadgeVariant(project.riskLevel)} size="sm">
              {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)} Risk
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 flex justify-between border-t border-neutral-200">
        <div className="flex items-center text-xs text-neutral-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            {new Date(project.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
          </span>
        </div>
        <Button 
          size="sm" 
          onClick={() => navigate(`/projects/${project.id}`)}
          icon={<ExternalLink className="h-4 w-4" />}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;