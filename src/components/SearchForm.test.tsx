
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  test('renders search form correctly', () => {
    render(
      <SearchForm 
        onSearch={jest.fn()} 
        searchTerm="" 
        setSearchTerm={jest.fn()} 
        isSearching={false}
      />
    );
    
    expect(screen.getByPlaceholderText('Search GitHub users...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('calls setSearchTerm when input changes', () => {
    const mockSetSearchTerm = jest.fn();
    
    render(
      <SearchForm 
        onSearch={jest.fn()} 
        searchTerm="" 
        setSearchTerm={mockSetSearchTerm} 
        isSearching={false}
      />
    );
    
    fireEvent.change(screen.getByPlaceholderText('Search GitHub users...'), {
      target: { value: 'test' },
    });
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
  });

  test('calls onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn();
    
    render(
      <SearchForm 
        onSearch={mockOnSearch} 
        searchTerm="test" 
        setSearchTerm={jest.fn()} 
        isSearching={false}
      />
    );
    
    fireEvent.submit(screen.getByRole('form'));
    expect(mockOnSearch).toHaveBeenCalled();
  });

  test('disables search button when searching', () => {
    render(
      <SearchForm 
        onSearch={jest.fn()} 
        searchTerm="test" 
        setSearchTerm={jest.fn()} 
        isSearching={true}
      />
    );
    
    expect(screen.getByRole('button', { name: '...' })).toBeDisabled();
  });

  test('disables search button when search term is empty', () => {
    render(
      <SearchForm 
        onSearch={jest.fn()} 
        searchTerm="" 
        setSearchTerm={jest.fn()} 
        isSearching={false}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
  });
});
