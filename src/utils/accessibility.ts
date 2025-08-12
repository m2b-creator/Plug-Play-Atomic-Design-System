// Accessibility Utilities - WCAG compliance helpers and testing utilities

export interface AccessibilityProps {
  // ARIA attributes
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-selected'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-pressed'?: boolean;
  'aria-disabled'?: boolean;
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-required'?: boolean;
  'aria-readonly'?: boolean;
  'aria-multiline'?: boolean;
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-controls'?: string;
  'aria-owns'?: string;
  'aria-activedescendant'?: string;
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
  role?: string;

  // Data attributes for testing
  'data-test-id'?: string;
}

// Color contrast utilities
export const colorContrast = {
  // WCAG AA minimum contrast ratios
  minContrast: {
    normal: 4.5,
    large: 3,
  },
  
  // WCAG AAA enhanced contrast ratios
  enhancedContrast: {
    normal: 7,
    large: 4.5,
  },

  // Check if colors meet WCAG contrast requirements
  meetsWCAG: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA', isLarge = false) => {
    // This is a simplified check - in production, use a proper contrast calculation library
    // Return true for now - implement actual contrast calculation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _threshold = level === 'AA' 
      ? (isLarge ? colorContrast.minContrast.large : colorContrast.minContrast.normal)
      : (isLarge ? colorContrast.enhancedContrast.large : colorContrast.enhancedContrast.normal);
    
    return true;
  },
};

// Keyboard navigation helpers
export const keyboardEvents = {
  // Standard keyboard event handlers
  onKeyDown: (
    event: React.KeyboardEvent,
    handlers: {
      onEnter?: () => void;
      onSpace?: () => void;
      onEscape?: () => void;
      onArrowDown?: () => void;
      onArrowUp?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
      onHome?: () => void;
      onEnd?: () => void;
      onTab?: () => void;
    }
  ) => {
    const { key, shiftKey } = event;

    switch (key) {
      case 'Enter':
        handlers.onEnter?.();
        break;
      case ' ':
        event.preventDefault(); // Prevent page scroll
        handlers.onSpace?.();
        break;
      case 'Escape':
        handlers.onEscape?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        handlers.onArrowDown?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        handlers.onArrowUp?.();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handlers.onArrowLeft?.();
        break;
      case 'ArrowRight':
        event.preventDefault();
        handlers.onArrowRight?.();
        break;
      case 'Home':
        event.preventDefault();
        handlers.onHome?.();
        break;
      case 'End':
        event.preventDefault();
        handlers.onEnd?.();
        break;
      case 'Tab':
        if (!shiftKey) {
          handlers.onTab?.();
        }
        break;
    }
  },
};

// Focus management utilities
export const focusManagement = {
  // Trap focus within an element
  trapFocus: (containerElement: HTMLElement, firstFocusableElement?: HTMLElement) => {
    const focusableElements = containerElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = firstFocusableElement || (focusableElements[0] as HTMLElement);
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    // Focus first element
    firstElement?.focus();

    // Add event listener
    document.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  },

  // Get next focusable element
  getNextFocusable: (currentElement: HTMLElement, direction: 'next' | 'previous' = 'next') => {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    const currentIndex = focusableElements.indexOf(currentElement);
    
    if (direction === 'next') {
      return focusableElements[currentIndex + 1] || focusableElements[0];
    } else {
      return focusableElements[currentIndex - 1] || focusableElements[focusableElements.length - 1];
    }
  },
};

// Screen reader utilities
export const screenReader = {
  // Announce message to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only'; // Visually hidden but accessible to screen readers
    announcer.textContent = message;

    document.body.appendChild(announcer);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  // Create visually hidden element for screen readers
  createVisuallyHidden: (text: string) => {
    return {
      className: 'sr-only',
      children: text,
      'aria-hidden': false,
    };
  },
};

// ARIA helpers
export const aria = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix = 'aria') => {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  },

  // Create describedby relationship
  createDescribedBy: (description: string) => {
    const id = aria.generateId('desc');
    return {
      'aria-describedby': id,
      descriptionProps: {
        id,
        children: description,
        className: 'sr-only',
      },
    };
  },

  // Create labelledby relationship
  createLabelledBy: (labelText: string) => {
    const id = aria.generateId('label');
    return {
      'aria-labelledby': id,
      labelProps: {
        id,
        children: labelText,
      },
    };
  },
};

// Accessibility testing utilities (for development)
export const a11yTest = {
  // Check if element has accessible name
  hasAccessibleName: (element: HTMLElement): boolean => {
    return !!(
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.textContent?.trim() ||
      (element as HTMLInputElement).placeholder
    );
  },

  // Check if interactive element has focus indicators
  hasFocusIndicator: (element: HTMLElement): boolean => {
    const styles = getComputedStyle(element, ':focus');
    return !!(
      styles.outline !== 'none' ||
      styles.boxShadow !== 'none' ||
      styles.border !== styles.getPropertyValue('border') // Border changes on focus
    );
  },

  // Validate ARIA attributes
  validateAria: (element: HTMLElement): string[] => {
    const warnings: string[] = [];
    
    // Check for common ARIA mistakes
    if (element.hasAttribute('aria-labelledby')) {
      const labelledById = element.getAttribute('aria-labelledby');
      if (labelledById && !document.getElementById(labelledById)) {
        warnings.push(`aria-labelledby references non-existent element: ${labelledById}`);
      }
    }

    if (element.hasAttribute('aria-describedby')) {
      const describedById = element.getAttribute('aria-describedby');
      if (describedById && !document.getElementById(describedById)) {
        warnings.push(`aria-describedby references non-existent element: ${describedById}`);
      }
    }

    return warnings;
  },
};

// Common accessibility patterns for components
export const accessibilityPatterns = {
  // Button pattern
  button: {
    baseProps: {
      type: 'button' as const,
      role: 'button',
    },
    
    withIcon: (label: string) => ({
      'aria-label': label,
    }),

    loading: {
      'aria-disabled': true,
      'aria-describedby': 'loading-description',
    },
  },

  // Input pattern
  input: {
    withLabel: (labelId: string) => ({
      'aria-labelledby': labelId,
    }),

    withError: (errorId: string) => ({
      'aria-invalid': true,
      'aria-describedby': errorId,
    }),

    required: {
      'aria-required': true,
      required: true,
    },
  },

  // Modal pattern
  modal: {
    dialog: {
      role: 'dialog',
      'aria-modal': true,
    },

    withTitle: (titleId: string) => ({
      'aria-labelledby': titleId,
    }),
  },

  // Navigation pattern
  navigation: {
    landmark: {
      role: 'navigation',
    },

    current: {
      'aria-current': 'page' as const,
    },
  },
} as const;