import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles different input types', () => {
    const { rerender } = render(<Input type="text" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');

    rerender(<Input type="email" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Input size="sm" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<Input size="lg" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('px-4', 'py-3', 'text-lg');
  });

  it('handles disabled state correctly', () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('handles error state correctly', () => {
    render(<Input error data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('border-red-500');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" />);
    
    const input = screen.getByTestId('input');
    await user.type(input, 'Hello, World!');
    expect(input).toHaveValue('Hello, World!');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} data-testid="input" />);
    
    await user.type(screen.getByTestId('input'), 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with leftIcon', () => {
    render(
      <Input 
        leftIcon={<span data-testid="left-icon">@</span>}
        data-testid="input"
      />
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with rightIcon', () => {
    render(
      <Input 
        rightIcon={<span data-testid="right-icon">✓</span>}
        data-testid="input"
      />
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('supports fullWidth prop', () => {
    render(<Input fullWidth data-testid="input-wrapper" />);
    expect(screen.getByTestId('input-wrapper')).toHaveClass('w-full');
  });

  it('accepts custom className', () => {
    render(<Input className="custom-class" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('custom-class');
  });

  it('has correct accessibility attributes', () => {
    render(
      <Input 
        aria-label="Custom input"
        aria-describedby="help-text"
        data-test-id="test-input"
        data-testid="input"
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-label', 'Custom input');
    expect(input).toHaveAttribute('aria-describedby', 'help-text');
    expect(input).toHaveAttribute('data-test-id', 'test-input');
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Input 
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid="input"
      />
    );
    
    const input = screen.getByTestId('input');
    await user.click(input);
    expect(handleFocus).toHaveBeenCalled();
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });
});