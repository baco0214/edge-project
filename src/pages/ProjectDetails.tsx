import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Landmark, Calendar, AlertTriangle, TrendingUp, Globe, Users, Building2 } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Progress from '../components/ui/Progress';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import FinancialChart from '../components/dashboard/FinancialChart';
import MilestoneTimeline from '../components/dashboard/MilestoneTimeline';
import DocumentCard from '../components/documents/DocumentCard';
import CommentSection from '../components/investor/CommentSection';
import { 
  projects, 
  financialReports, 
  quarterlyData, 
  milestones, 
  documents, 
  comments 
} from '../data/mockData';
import { formatCurrency, formatPercent, getProgressColor } from '../lib/utils';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find project by id
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">The project you're looking for doesn't exist or you don't have access to it.</p>
        <Link to="/projects">
          <Button>Return to Projects</Button>
        </Link>
      </div>
    );
  }
  
  // Get project specific data
  const projectMilestones = milestones.filter(m => m.projectId === id);
  const projectDocuments = documents.filter(d => d.projectId === id);
  const projectComments = comments.filter(c => c.projectId === id);
  const projectFinancialData = quarterlyData[id] || [];
  
  const completedMilestones = projectMilestones.filter(m => m.completed).length;
  const totalMilestones = projectMilestones.length;
  const milestoneCompletion = totalMilestones > 0 
    ? Math.round((completedMilestones / totalMilestones) * 100) 
    : 0;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          to="/projects" 
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
      </div>
      
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-8">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-0">{project.title}</h1>
              <div className="flex space-x-2">
                <Badge variant={project.status === 'in-progress' ? 'secondary' : 'success'} size="lg">
                  {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </Badge>
                <Badge variant={
                  project.riskLevel === 'low' ? 'success' : 
                  project.riskLevel === 'medium' ? 'warning' : 'error'
                } size="lg">
                  {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)} Risk
                </Badge>
              </div>
            </div>
            <p className="text-white/80 text-sm sm:text-base max-w-3xl">{project.description}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <div className="flex items-center mb-2">
                      <Building2 className="h-5 w-5 text-primary-600 mr-2" />
                      <span className="text-sm font-medium">Total Investment</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(project.investmentAmount)}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-success-600 mr-2" />
                      <span className="text-sm font-medium">Projected ROI</span>
                    </div>
                    <p className="text-2xl font-bold text-success-600">{formatPercent(project.roi)}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-primary-600 mr-2" />
                      <span className="text-sm font-medium">Timeline</span>
                    </div>
                    <p className="text-sm">
                      {new Date(project.startDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })} - {new Date(project.endDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 text-primary-600 mr-2" />
                      <span className="text-sm font-medium">Category</span>
                    </div>
                    <p className="text-base font-medium">{project.category}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Project Progress</h3>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div
                      className={`${getProgressColor(project.progress)} h-3 rounded-full transition-all duration-700 ease-in-out`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Milestone Completion</h3>
                    <span className="text-sm font-medium">{completedMilestones} of {totalMilestones} ({milestoneCompletion}%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div
                      className={`${getProgressColor(milestoneCompletion)} h-3 rounded-full transition-all duration-700 ease-in-out`}
                      style={{ width: `${milestoneCompletion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <FinancialChart 
                data={projectFinancialData} 
                title="Financial Performance"
                description="Quarterly revenue, expenses, and profit"
              />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Project Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectDocuments.map(document => (
                    <DocumentCard key={document.id} document={document} />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <MilestoneTimeline 
                milestones={projectMilestones} 
                title="Project Milestones"
              />
            </div>
          </div>
        </div>
      </div>
      
      <CommentSection 
        comments={projectComments} 
        projectId={project.id}
      />
    </div>
  );
};

export default ProjectDetails;