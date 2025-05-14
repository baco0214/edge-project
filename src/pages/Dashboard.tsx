import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Building2, BarChart, Filter, PlusCircle } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProjectCard from '../components/dashboard/ProjectCard';
import StatCard from '../components/dashboard/StatCard';
import FinancialChart from '../components/dashboard/FinancialChart';
import { projects, financialReports, quarterlyData } from '../data/mockData';
import { formatCurrency } from '../lib/utils';

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  // Calculate summary stats
  const totalInvestment = projects.reduce((acc, project) => acc + project.investmentAmount, 0);
  const totalProjectedReturn = projects.reduce((acc, project) => acc + project.projectedReturn, 0);
  const averageROI = projects.reduce((acc, project) => acc + project.roi, 0) / projects.length;
  const activeProjects = projects.filter(project => project.status === 'in-progress').length;
  
  // Filter projects based on selected filter
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.category.toLowerCase() === filter.toLowerCase();
  });
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(projects.map(project => project.category.toLowerCase()))];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Investor Dashboard"
        description="Track your investments, monitor progress, and analyze financial performance."
        actions={
          <Button 
            variant="outline"
            icon={<Filter className="h-4 w-4" />}
          >
            Filter
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Investment"
          value={formatCurrency(totalInvestment)}
          icon={<Building2 className="h-5 w-5 text-primary-600" />}
          change={{ value: 12.5, type: 'increase' }}
        />
        <StatCard
          title="Projected Return"
          value={formatCurrency(totalProjectedReturn)}
          icon={<TrendingUp className="h-5 w-5 text-success-600" />}
          change={{ value: 8.3, type: 'increase' }}
        />
        <StatCard
          title="Average ROI"
          value={`${averageROI.toFixed(1)}%`}
          icon={<BarChart className="h-5 w-5 text-secondary-600" />}
          change={{ value: 3.2, type: 'increase' }}
        />
        <StatCard
          title="Active Projects"
          value={activeProjects}
          icon={<BarChart3 className="h-5 w-5 text-primary-600" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <FinancialChart 
            data={quarterlyData['1']} 
            title="Financial Performance - All Projects"
            description="Quarterly revenue, expenses, and profit across all active investments"
          />
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Investment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Real Estate', 'Technology', 'Energy', 'Healthcare', 'Infrastructure'].map((category) => {
                  const categoryProjects = projects.filter(p => p.category === category);
                  const categoryInvestment = categoryProjects.reduce((sum, p) => sum + p.investmentAmount, 0);
                  const percentage = (categoryInvestment / totalInvestment) * 100;
                  
                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-neutral-700">{category}</span>
                        <span className="text-sm font-medium text-neutral-700">
                          {formatCurrency(categoryInvestment)}
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2.5">
                        <div
                          className="bg-primary-600 h-2.5 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        {percentage.toFixed(1)}% of portfolio
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">Your Investments</h2>
          <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  filter === category
                    ? 'bg-primary-100 text-primary-800 font-medium'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            variant="outline"
            icon={<PlusCircle className="h-4 w-4" />}
            className="mx-auto"
          >
            Explore More Investment Opportunities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;