
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Index from './Index';
import { useGitHubSearch } from '@/hooks/useGitHubSearch';

// Mock the custom hook
jest.mock('@/hooks/useGitHubSearch', () => ({
  useGitHubSearch: jest.fn(),
}));

const mockUseGitHubSearch = useGitHubSearch as jest.MockedFunction<typeof useGitHubSearch>;

describe('Index', () => {
  beforeEach(() => {
    mockUseGitHubSearch.mockReturnValue({
      searchTerm: '',
      setSearchTerm: jest.fn(),
      users: [],
      selectedUser: null,
      repos: [],
      isSearching: false,
      isLoadingRepos: false,
      handleSearch: jest.fn(),
      handleUserSelect: jest.fn(),
    });
  });

  test('renders GitHub Explorer title', () => {
    render(<Index />);
    expect(screen.getByText('GitHub Explorer')).toBeInTheDocument();
  });

  test('renders search form', () => {
    render(<Index />);
    expect(screen.getByPlaceholderText('Search GitHub users...')).toBeInTheDocument();
  });

  test('renders user list when users are available', () => {
    mockUseGitHubSearch.mockReturnValue({
      searchTerm: 'test',
      setSearchTerm: jest.fn(),
      users: [
        { id: 1, login: 'testuser1', avatar_url: '', html_url: '', type: 'User' },
        { id: 2, login: 'testuser2', avatar_url: '', html_url: '', type: 'User' },
      ],
      selectedUser: null,
      repos: [],
      isSearching: false,
      isLoadingRepos: false,
      handleSearch: jest.fn(),
      handleUserSelect: jest.fn(),
    });

    render(<Index />);
    expect(screen.getByText('Results for "test"')).toBeInTheDocument();
    expect(screen.getByText('testuser1')).toBeInTheDocument();
    expect(screen.getByText('testuser2')).toBeInTheDocument();
  });

  test('renders repository list when user is selected', () => {
    mockUseGitHubSearch.mockReturnValue({
      searchTerm: 'test',
      setSearchTerm: jest.fn(),
      users: [
        { id: 1, login: 'testuser', avatar_url: '', html_url: '', type: 'User' },
      ],
      selectedUser: 'testuser',
      repos: [
        { 
          id: 1, 
          name: 'test-repo', 
          description: 'Test repo description',
          stargazers_count: 10,
          language: 'TypeScript',
          updated_at: new Date().toISOString(),
          html_url: '',
          forks_count: 5,
          private: false,
          fork: false,
        },
      ],
      isSearching: false,
      isLoadingRepos: false,
      handleSearch: jest.fn(),
      handleUserSelect: jest.fn(),
    });

    render(<Index />);
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('Test repo description')).toBeInTheDocument();
  });
});
