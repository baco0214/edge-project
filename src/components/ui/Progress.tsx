import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, variant = 'default', size = 'md', showValue = false, label, ...props }, ref) => {
    const percentage = (value / max) * 100;
    
    const variantStyles = {
      default: 'bg-primary-600',
      success: 'bg-success-600',
      warning: 'bg-warning-500',
      error: 'bg-error-600',
    };
    
    const sizeStyles = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    };
    
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {label && (
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-neutral-700">{label}</span>
            {showValue && (
              <span className="text-sm font-medium text-neutral-700">{Math.round(percentage)}%</span>
            )}
          </div>
        )}
        <div className={cn('w-full bg-neutral-200 rounded-full overflow-hidden', sizeStyles[size])}>
          <div
            className={cn('transition-all duration-300 ease-in-out rounded-full', variantStyles[variant])}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;