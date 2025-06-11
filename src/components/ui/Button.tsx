import React from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: LucideIcon | React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  icon: IconComponent,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center';
  
  const variantClasses = {
    primary: 'bg-purple-700 hover:bg-purple-800 text-white focus:ring-purple-500',
    secondary: 'bg-red-700 hover:bg-red-800 text-white focus:ring-red-500',
    outline: 'border border-purple-500 text-purple-700 hover:bg-purple-50 focus:ring-purple-500',
    ghost: 'text-purple-700 hover:bg-purple-50 focus:ring-purple-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {IconComponent && typeof IconComponent !== 'function' && (
        <span className="mr-2">{IconComponent}</span>
      )}
      {IconComponent && typeof IconComponent === 'function' && (
        <IconComponent className="w-4 h-4 mr-2" />
      )}
      {children}
    </button>
  );
};

export default Button;