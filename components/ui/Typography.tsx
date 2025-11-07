'use client';

import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h1 className={`heading-xl ${className}`}>{children}</h1>
);

export const H2: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h2 className={`heading-lg ${className}`}>{children}</h2>
);

export const H3: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h3 className={`heading-md ${className}`}>{children}</h3>
);

export const H4: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h4 className={`heading-sm ${className}`}>{children}</h4>
);

interface TextProps extends TypographyProps {
  variant?: 'default' | 'muted' | 'accent';
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  className = '',
  variant = 'default' 
}) => {
  const variantClasses = {
    default: 'text-white',
    muted: 'text-jarvis-gray',
    accent: 'text-jarvis-cyan'
  };

  return (
    <p className={`text-base leading-relaxed ${variantClasses[variant]} ${className}`}>
      {children}
    </p>
  );
};

interface LabelProps extends TypographyProps {
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({ 
  children, 
  className = '',
  htmlFor 
}) => (
  <label 
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-jarvis-gray mb-2 ${className}`}
  >
    {children}
  </label>
);
