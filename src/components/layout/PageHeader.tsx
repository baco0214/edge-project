import React from 'react';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  actions,
  className
}) => {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="mt-4 md:mt-0 flex-shrink-0 flex">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;