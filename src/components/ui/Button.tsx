import React from 'react';
import { usePreferences } from '../../context/PreferencesContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const { preferences } = usePreferences();
  
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const variantStyles = {
    primary: preferences.highContrast 
      ? 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-700'
      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: preferences.highContrast
      ? 'bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-700'
      : 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    outline: preferences.highContrast
      ? 'border-2 border-gray-900 text-gray-900 hover:bg-gray-100 focus:ring-gray-700'
      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    text: preferences.highContrast
      ? 'text-blue-700 hover:bg-blue-50 focus:ring-blue-700'
      : 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;