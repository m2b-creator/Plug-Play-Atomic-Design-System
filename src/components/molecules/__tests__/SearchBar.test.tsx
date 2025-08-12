import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders search button by default', () => {
    render(<SearchBar />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('hides search button when showButton is false', () => {
    render(<SearchBar showButton={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onSearch when search button is clicked', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    
    await user.type(input, 'test query');
    await user.click(button);
    
    expect(handleSearch).toHaveBeenCalledWith('test query');
  });

  it('calls onSearch when Enter is pressed', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test query{enter}');
    
    expect(handleSearch).toHaveBeenCalledWith('test query');
  });

  it('shows loading state', () => {
    render(<SearchBar loading />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Searching...');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<SearchBar size="sm" data-testid="searchbar" />);
    const searchbar = screen.getByTestId('searchbar');
    expect(searchbar).toBeInTheDocument();

    rerender(<SearchBar size="lg" data-testid="searchbar" />);
    const largeSearchbar = screen.getByTestId('searchbar');
    expect(largeSearchbar).toBeInTheDocument();
  });

  it('supports search functionality via form submission', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test search');
    
    const form = screen.getByRole('textbox').closest('form');
    expect(form).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    render(<SearchBar className="custom-class" data-testid="searchbar" />);
    expect(screen.getByTestId('searchbar')).toHaveClass('custom-class');
  });

  it('has correct accessibility attributes', () => {
    render(
      <SearchBar 
        aria-label="Search products"
        data-test-id="product-search"
        data-testid="searchbar"
      />
    );
    
    const searchbar = screen.getByTestId('searchbar');
    expect(searchbar).toHaveAttribute('data-test-id', 'product-search');
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Search products');
  });

  it('supports custom button text', () => {
    render(<SearchBar buttonText="Find" />);
    expect(screen.getByRole('button', { name: 'Find' })).toBeInTheDocument();
  });
});