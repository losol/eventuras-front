import React from 'react';

import { BoxProps, mapToClassName } from './Box';

interface ButtonGroupProps {
  children: React.ReactNode;
}

const ButtonGroup: React.FC<ButtonGroupProps & BoxProps> = ({ children, ...spacingProps }) => {
  const baseClassName = 'inline-flex rounded-md shadow-sm';
  const spacingClassName = mapToClassName(spacingProps);
  const className = [baseClassName, spacingClassName].join(' ');

  return (
    <div className={className} role="group">
      {children}
    </div>
  );
};

export default ButtonGroup;
