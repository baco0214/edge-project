import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = '', size = 'md', fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    const sizeStyles = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
    };
    
    const getFallbackInitials = () => {
      if (fallback) return fallback;
      if (!alt) return '?';
      
      return alt
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-full bg-neutral-200 flex items-center justify-center',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-medium text-neutral-600">
            {getFallbackInitials()}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;