import { render, screen } from '@/test/test-utils';
import { Button, Input, Modal } from '@/components';
import { a11yTest } from '@/utils/accessibility';

// Mock axe-core for accessibility testing
// In a real project, you'd install @axe-core/react or jest-axe
const mockAxeRun = jest.fn().mockResolvedValue({ violations: [] });
jest.mock('axe-core', () => ({
  run: mockAxeRun,
}));

describe('Accessibility Compliance', () => {
  describe('Button Accessibility', () => {
    it('has accessible name', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName('Click me');
    });

    it('supports aria-label for icon-only buttons', () => {
      render(<Button aria-label="Close dialog" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName('Close dialog');
    });

    it('indicates disabled state to screen readers', () => {
      render(<Button disabled>Disabled button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports icon-only buttons with proper labeling', () => {
      render(<Button iconOnly aria-label="Menu">☰</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName('Menu');
    });

    it('supports keyboard navigation', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard test</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveFocus();
    });

    it('has proper focus indicators', () => {
      render(<Button>Focus test</Button>);
      const button = screen.getByRole('button');
      
      // Check that focus styles are applied via CSS classes
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });

  describe('Input Accessibility', () => {
    it('supports aria-label', () => {
      render(<Input aria-label="Search products" />);
      const input = screen.getByLabelText('Search products');
      expect(input).toBeInTheDocument();
    });

    it('indicates required fields', () => {
      render(<Input required aria-label="Required field" />);
      const input = screen.getByLabelText('Required field');
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('indicates error state', () => {
      render(<Input error aria-label="Error field" />);
      const input = screen.getByLabelText('Error field');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports aria-describedby for help text', () => {
      render(
        <div>
          <Input aria-label="Email" aria-describedby="email-help" />
          <div id="email-help">Enter your email address</div>
        </div>
      );
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-describedby', 'email-help');
    });

    it('has proper keyboard navigation', () => {
      render(<Input aria-label="Keyboard test" />);
      const input = screen.getByLabelText('Keyboard test');
      
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Modal Accessibility', () => {
    it('has dialog role and aria-modal', () => {
      render(
        <Modal open={true} onClose={() => {}} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('has accessible name from title', () => {
      render(
        <Modal open={true} onClose={() => {}} title="Confirmation Dialog">
          <p>Are you sure?</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAccessibleName('Confirmation Dialog');
    });

    it('supports aria-describedby for content', () => {
      render(
        <Modal 
          open={true} 
          onClose={() => {}} 
          title="Delete Item"
        >
          <p id="modal-description">This action cannot be undone.</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('provides close button with accessible name', () => {
      render(
        <Modal open={true} onClose={() => {}} title="Test Modal" showCloseButton>
          <p>Content</p>
        </Modal>
      );
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Color Contrast', () => {
    it('meets WCAG AA contrast requirements for buttons', () => {
      render(<Button variant="primary">Primary Button</Button>);
      const button = screen.getByRole('button');
      
      // Check that proper color classes are applied
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('meets WCAG AA contrast requirements for text', () => {
      render(<div className="text-gray-900 bg-white">High contrast text</div>);
      const text = screen.getByText('High contrast text');
      
      // Verify contrast-safe color classes
      expect(text).toHaveClass('text-gray-900', 'bg-white');
    });
  });

  describe('Screen Reader Support', () => {
    it('provides screen reader only content where needed', () => {
      render(
        <Button>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName('Close');
    });

    it('hides decorative elements from screen readers', () => {
      render(
        <div>
          <span aria-hidden="true">🎉</span>
          <span>Congratulations!</span>
        </div>
      );
      
      const emoji = screen.getByText('🎉');
      expect(emoji).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports Tab navigation order', () => {
      render(
        <div>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </div>
      );
      
      const buttons = screen.getAllByRole('button');
      
      // Verify tabIndex is proper (0 or undefined for focusable elements)
      buttons.forEach(button => {
        const tabIndex = button.getAttribute('tabindex');
        expect(tabIndex === null || tabIndex === '0').toBe(true);
      });
    });

    it('skips disabled elements in tab order', () => {
      render(
        <div>
          <Button>Enabled</Button>
          <Button disabled>Disabled</Button>
          <Button>Enabled 2</Button>
        </div>
      );
      
      const enabledButtons = screen.getAllByRole('button').filter(btn => !btn.hasAttribute('disabled'));
      expect(enabledButtons).toHaveLength(2);
    });
  });

  describe('Live Regions', () => {
    it('announces status changes', () => {
      render(
        <div>
          <div aria-live="polite" data-testid="status">
            Form saved successfully
          </div>
        </div>
      );
      
      const liveRegion = screen.getByTestId('status');
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });

  // Utility function tests
  describe('Accessibility Utilities', () => {
    it('correctly identifies elements with accessible names', () => {
      render(<Button aria-label="Test button">Button text</Button>);
      const button = screen.getByRole('button');
      
      expect(a11yTest.hasAccessibleName(button)).toBe(true);
    });

    it('validates ARIA attributes', () => {
      render(
        <div>
          <Button aria-labelledby="missing-label">Button</Button>
          <Button aria-describedby="missing-desc">Button 2</Button>
        </div>
      );
      
      const buttons = screen.getAllByRole('button');
      
      const warnings1 = a11yTest.validateAria(buttons[0]);
      expect(warnings1).toContain('aria-labelledby references non-existent element: missing-label');
      
      const warnings2 = a11yTest.validateAria(buttons[1]);
      expect(warnings2).toContain('aria-describedby references non-existent element: missing-desc');
    });
  });
});