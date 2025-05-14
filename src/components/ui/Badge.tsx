import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-neutral-100 text-neutral-800 border-neutral-200',
      primary: 'bg-primary-100 text-primary-800 border-primary-200',
      secondary: 'bg-secondary-100 text-secondary-800 border-secondary-200',
      success: 'bg-success-100 text-success-800 border-success-200',
      warning: 'bg-warning-100 text-warning-800 border-warning-200',
      error: 'bg-error-100 text-error-800 border-error-200',
      outline: 'bg-transparent border-neutral-300 text-neutral-800',
    };

    const sizeStyles = {
      sm: 'text-xs px-2 py-0.5 rounded',
      md: 'text-xs px-2.5 py-0.5 rounded',
      lg: 'text-sm px-3 py-1 rounded-md',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center border font-medium',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;