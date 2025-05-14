import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  change,
  className,
}) => {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-neutral-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
            {description && (
              <p className="mt-1 text-sm text-neutral-500">{description}</p>
            )}
            {change && (
              <div className="mt-2 flex items-center">
                {change.type === 'increase' ? (
                  <>
                    <svg
                      className="w-4 h-4 text-success-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-success-600">
                      {change.value}%
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 text-error-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-error-600">
                      {change.value}%
                    </span>
                  </>
                )}
                <span className="ml-1 text-sm text-neutral-500">from last period</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="p-2 bg-primary-50 rounded-lg">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;