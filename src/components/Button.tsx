import React from 'react';
import LoadingSpinner from './LoadingSpinner';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  primary = true,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 inline-flex items-center justify-center space-x-2";
  const primaryClasses =
    "bg-accent-light text-primary-light dark:bg-accent-dark dark:text-primary-dark hover:opacity-90";
  const secondaryClasses =
    "bg-transparent border border-accent-light text-accent-light dark:border-accent-dark dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10";

  const buttonClasses = `${baseClasses} ${
    primary ? primaryClasses : secondaryClasses
  } ${className}`;

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
};

export default Button;
