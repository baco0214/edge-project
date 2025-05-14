import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { QuarterlyData } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface FinancialChartProps {
  data: QuarterlyData[];
  title: string;
  description?: string;
}

const FinancialChart: React.FC<FinancialChartProps> = ({ data, title, description }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg border border-neutral-200 rounded-lg">
          <p className="font-medium text-neutral-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center mb-1">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-neutral-700 mr-2">
                {entry.name}:
              </span>
              <span className="text-sm font-medium">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-neutral-500">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                tickFormatter={(value) => `$${value / 1000}k`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#F97316"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="profit"
                name="Profit"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialChart;