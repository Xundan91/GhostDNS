import React from 'react';

type ButtonProps = {
  primary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ 
  primary = true, 
  children, 
  onClick,
  className = ''
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 inline-flex items-center justify-center";
  const primaryClasses = "bg-accent-light text-primary-light dark:bg-accent-dark dark:text-primary-dark hover:opacity-90";
  const secondaryClasses = "bg-transparent border border-accent-light text-accent-light dark:border-accent-dark dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10";
  
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`;
  
  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;