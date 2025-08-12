// Component Documentation Registry
// Comprehensive documentation for all components

import { ComponentDocumentation } from '@/types/component-docs';

export const componentDocs: Record<string, ComponentDocumentation> = {
  Button: {
    name: 'Button',
    description: 'Interactive button component with multiple variants, sizes, and states. Supports loading, disabled states, and custom icons.',
    category: 'atoms',
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'",
        required: false,
        defaultValue: 'primary',
        description: 'Visual style variant of the button',
        examples: ['primary', 'secondary', 'danger'],
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        required: false,
        defaultValue: 'md',
        description: 'Size of the button',
        examples: ['sm', 'md', 'lg'],
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether the button is disabled',
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether the button is in loading state',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether the button takes full width of its container',
      },
      {
        name: 'leftIcon',
        type: 'React.ReactNode',
        required: false,
        description: 'Icon to display on the left side of the button',
      },
      {
        name: 'rightIcon',
        type: 'React.ReactNode',
        required: false,
        description: 'Icon to display on the right side of the button',
      },
      {
        name: 'onClick',
        type: '(event: React.MouseEvent) => void',
        required: false,
        description: 'Click event handler',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'data-test-id',
        type: 'string',
        required: false,
        description: 'Test identifier for automated testing',
      },
    ],
    examples: [
      {
        name: 'Basic Usage',
        description: 'Simple button with default styling',
        code: `<Button>Click me</Button>`,
      },
      {
        name: 'With Variants',
        description: 'Different visual styles',
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>`,
      },
      {
        name: 'With Icons',
        description: 'Buttons with left or right icons',
        code: `<Button leftIcon={<Icon name="Plus" />}>
  Add Item
</Button>
<Button rightIcon={<Icon name="ArrowRight" />}>
  Next
</Button>`,
      },
      {
        name: 'Loading State',
        description: 'Button in loading state',
        code: `<Button loading>Processing...</Button>`,
      },
    ],
    accessibility: {
      ariaSupported: ['aria-label', 'aria-describedby', 'aria-pressed'],
      keyboardNavigation: ['Tab to focus', 'Enter/Space to activate'],
      screenReaderSupport: true,
      colorContrast: 'WCAG AA compliant (4.5:1 minimum)',
      guidelines: [
        'Use descriptive text that explains the action',
        'Provide aria-label for icon-only buttons',
        'Ensure sufficient color contrast',
        'Support keyboard navigation',
      ],
    },
    usage: `The Button component is the primary interactive element for triggering actions. Use appropriate variants to convey hierarchy and meaning:
    
- Primary: Main actions (submit forms, confirm dialogs)
- Secondary: Supporting actions
- Danger: Destructive actions (delete, cancel)
- Ghost: Subtle actions in toolbars
- Outline: Alternative to filled buttons`,
  },

  Input: {
    name: 'Input',
    description: 'Flexible input component supporting various types, sizes, and states. Includes support for icons, validation states, and accessibility features.',
    category: 'atoms',
    props: [
      {
        name: 'type',
        type: "'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'",
        required: false,
        defaultValue: 'text',
        description: 'HTML input type',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: 'md',
        description: 'Size of the input field',
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether the input is disabled',
      },
      {
        name: 'error',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether the input is in error state',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether the input takes full width',
      },
      {
        name: 'leftIcon',
        type: 'React.ReactNode',
        required: false,
        description: 'Icon to display on the left side',
      },
      {
        name: 'rightIcon',
        type: 'React.ReactNode',
        required: false,
        description: 'Icon to display on the right side',
      },
    ],
    examples: [
      {
        name: 'Basic Input',
        description: 'Simple text input',
        code: `<Input placeholder="Enter your name" />`,
      },
      {
        name: 'With Icons',
        description: 'Input with left and right icons',
        code: `<Input 
  leftIcon={<Icon name="Mail" />}
  placeholder="Email address"
  type="email"
/>`,
      },
      {
        name: 'Error State',
        description: 'Input in error state',
        code: `<Input 
  error
  placeholder="Invalid email"
  value="invalid-email"
/>`,
      },
    ],
    accessibility: {
      ariaSupported: ['aria-label', 'aria-describedby', 'aria-invalid'],
      keyboardNavigation: ['Tab to focus', 'Standard input navigation'],
      screenReaderSupport: true,
      colorContrast: 'WCAG AA compliant',
      guidelines: [
        'Always provide labels or aria-label',
        'Use aria-describedby for error messages',
        'Set aria-invalid for error states',
        'Provide clear placeholder text',
      ],
    },
    usage: `Use Input components for collecting user data. Always pair with Label components and provide appropriate validation feedback.`,
  },

  SearchBar: {
    name: 'SearchBar',
    description: 'Composite search component with input field, search button, and optional clear functionality. Built for search interactions and filtering.',
    category: 'molecules',
    props: [
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        defaultValue: 'Search...',
        description: 'Placeholder text for the search input',
      },
      {
        name: 'onSearch',
        type: '(query: string) => void',
        required: false,
        description: 'Callback fired when search is triggered',
      },
      {
        name: 'showButton',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'Whether to show the search button',
      },
      {
        name: 'buttonText',
        type: 'string',
        required: false,
        defaultValue: 'Search',
        description: 'Text for the search button',
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether the search is in loading state',
      },
      {
        name: 'clearable',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether to show clear button when there is text',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: 'md',
        description: 'Size of the search bar',
      },
    ],
    examples: [
      {
        name: 'Basic Search',
        description: 'Simple search bar with button',
        code: `<SearchBar 
  placeholder="Search products..."
  onSearch={(query) => console.log(query)}
/>`,
      },
      {
        name: 'No Button',
        description: 'Search bar without button (Enter to search)',
        code: `<SearchBar 
  showButton={false}
  onSearch={(query) => handleSearch(query)}
/>`,
      },
    ],
    accessibility: {
      ariaSupported: ['aria-label', 'role="search"'],
      keyboardNavigation: ['Enter to search', 'Escape to clear'],
      screenReaderSupport: true,
      colorContrast: 'WCAG AA compliant',
      guidelines: [
        'Use role="search" on container',
        'Provide clear labels',
        'Support Enter key for search',
        'Announce search results',
      ],
    },
    usage: `SearchBar is ideal for filtering content, searching databases, or triggering search functionality. Use onSearch callback to handle search logic.`,
  },

  Modal: {
    name: 'Modal',
    description: 'Overlay dialog component for displaying content above the main interface. Includes backdrop, focus management, and keyboard navigation.',
    category: 'organisms',
    props: [
      {
        name: 'isOpen',
        type: 'boolean',
        required: true,
        description: 'Whether the modal is open',
      },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Callback to close the modal',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Title displayed in the modal header',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
        required: false,
        defaultValue: 'md',
        description: 'Size of the modal',
      },
      {
        name: 'showCloseButton',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'Whether to show the close button in header',
      },
      {
        name: 'closeOnBackdropClick',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'Whether clicking backdrop closes modal',
      },
      {
        name: 'closeOnEscape',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'Whether pressing Escape closes modal',
      },
    ],
    examples: [
      {
        name: 'Basic Modal',
        description: 'Simple modal with title and content',
        code: `<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to continue?</p>
  <div className="flex gap-2 mt-4">
    <Button onClick={handleConfirm}>Confirm</Button>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
  </div>
</Modal>`,
      },
    ],
    accessibility: {
      ariaSupported: ['role="dialog"', 'aria-modal', 'aria-labelledby'],
      keyboardNavigation: ['Escape to close', 'Tab trapping'],
      screenReaderSupport: true,
      colorContrast: 'WCAG AA compliant',
      guidelines: [
        'Focus management (trap focus within modal)',
        'Return focus to trigger element on close',
        'Use aria-labelledby for title',
        'Support Escape key to close',
      ],
    },
    usage: `Use Modal for confirmation dialogs, forms, detailed views, or any content that needs user focus. Always provide a clear way to close the modal.`,
  },
};

export function getComponentDoc(componentName: string): ComponentDocumentation | undefined {
  return componentDocs[componentName];
}

export function getAllDocs(): ComponentDocumentation[] {
  return Object.values(componentDocs);
}

export function getDocsByCategory(category: ComponentDocumentation['category']): ComponentDocumentation[] {
  return Object.values(componentDocs).filter(doc => doc.category === category);
}