import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading = false, children, icon, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variantStyles = {
      default: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
      outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-100 active:bg-neutral-200 text-neutral-900',
      ghost: 'bg-transparent hover:bg-neutral-100 active:bg-neutral-200 text-neutral-900',
      link: 'bg-transparent underline-offset-4 hover:underline text-primary-600 hover:text-primary-700 p-0 h-auto',
      danger: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800',
    };
    
    const sizeStyles = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };
    
    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          icon && children ? 'gap-2' : '',
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {icon && !isLoading && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;