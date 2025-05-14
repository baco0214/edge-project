import React from 'react';
import { BarChart3, Download, Filter } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import FinancialChart from '../components/dashboard/FinancialChart';
import { quarterlyData, projects } from '../data/mockData';
import { formatCurrency } from '../lib/utils';

const FinancialReports: React.FC = () => {
  const totalInvestment = projects.reduce((acc, project) => acc + project.investmentAmount, 0);
  const totalProjectedReturn = projects.reduce((acc, project) => acc + project.projectedReturn, 0);
  const totalProfit = totalProjectedReturn - totalInvestment;
  const overallROI = ((totalProjectedReturn - totalInvestment) / totalInvestment) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Financial Reports"
        description="Track financial performance and analyze investment returns across all projects."
        actions={
          <div className="flex gap-2">
            <Button 
              variant="outline"
              icon={<Filter className="h-4 w-4" />}
            >
              Filter
            </Button>
            <Button 
              variant="outline"
              icon={<Download className="h-4 w-4" />}
            >
              Export
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500">Total Investment</p>
                <p className="mt-2 text-3xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500">Projected Return</p>
                <p className="mt-2 text-3xl font-bold text-neutral-900">{formatCurrency(totalProjectedReturn)}</p>
              </div>
              <div className="p-2 bg-success-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500">Total Profit</p>
                <p className="mt-2 text-3xl font-bold text-success-600">{formatCurrency(totalProfit)}</p>
              </div>
              <div className="p-2 bg-success-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500">Overall ROI</p>
                <p className="mt-2 text-3xl font-bold text-primary-600">{overallROI.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="border-b border-neutral-200">
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <FinancialChart 
                  data={quarterlyData[project.id] || []} 
                  title=""
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FinancialReports;