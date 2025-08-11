import type { LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';
import React from 'react';

export interface IconProps extends Omit<LucideProps, 'size'> {
  /** Name of the lucide icon */
  name: keyof typeof LucideIcons;
  /** Size of the icon */
  size?: ComponentSize | number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const iconSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export const Icon = ({
  name,
  size = 'md',
  className,
  'data-test-id': testId,
  ...props
}: IconProps) => {
  const IconComponent = LucideIcons[name] as React.ComponentType<LucideProps>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  const sizeClasses = typeof size === 'string' 
    ? iconSizeClasses[size] 
    : '';

  const iconClasses = cn(
    'inline-block',
    sizeClasses,
    className
  );

  const iconSize = typeof size === 'number' ? size : undefined;

  return (
    <IconComponent
      className={iconClasses}
      size={iconSize}
      data-test-id={testId}
      {...props}
    />
  );
};

Icon.displayName = 'Icon';