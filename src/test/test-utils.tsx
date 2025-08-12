import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render function for components that need providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

export * from '@testing-library/react';
export { customRender as render };

// Test data helpers
export const testIds = {
  button: 'button',
  input: 'input',
  modal: 'modal',
  dropdown: 'dropdown',
} as const;

// Accessibility test helpers
export const axeMatchers = {
  toHaveNoViolations: expect.extend({}),
};

// Mock data generators
export const createMockProps = <T extends object>(overrides?: Partial<T>): T => {
  return {
    'data-test-id': 'test-component',
    ...overrides,
  } as T;
};

// Event simulation helpers
export const createMockEvent = <T extends Event>(
  type: string,
  overrides?: Partial<T>
): T => {
  const event = new Event(type) as T;
  return Object.assign(event, overrides);
};

// Component testing patterns
export const testComponentVariants = <T extends string>(
  Component: React.ComponentType<{ variant?: T }>,
  variants: T[]
) => {
  variants.forEach((variant) => {
    it(`renders ${variant} variant correctly`, () => {
      const { container } = render(<Component variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
};

export const testComponentSizes = <T extends string>(
  Component: React.ComponentType<{ size?: T }>,
  sizes: T[]
) => {
  sizes.forEach((size) => {
    it(`renders ${size} size correctly`, () => {
      const { container } = render(<Component size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
};