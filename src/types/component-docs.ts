// Component Documentation Types
// Used for generating automatic documentation from TypeScript interfaces

export interface ComponentDocumentation {
  name: string;
  description: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';
  props: PropDocumentation[];
  examples: ComponentExample[];
  accessibility: AccessibilityInfo;
  usage: string;
}

export interface PropDocumentation {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
  examples?: string[];
}

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
  preview?: React.ReactNode;
}

export interface AccessibilityInfo {
  ariaSupported: string[];
  keyboardNavigation: string[];
  screenReaderSupport: boolean;
  colorContrast: string;
  guidelines: string[];
}