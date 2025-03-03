
import { renderHook, act } from '@testing-library/react-hooks';
import { useGitHubSearch } from './useGitHubSearch';
import { searchUsers, getUserRepos } from '@/api/github';
import { useToast } from '@/components/ui/use-toast';

// Mock dependencies
jest.mock('@/api/github');
jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(),
}));

const mockSearchUsers = searchUsers as jest.MockedFunction<typeof searchUsers>;
const mockGetUserRepos = getUserRepos as jest.MockedFunction<typeof getUserRepos>;
const mockToast = { toast: jest.fn() };

describe('useGitHubSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  test('initializes with default values', () => {
    const { result } = renderHook(() => useGitHubSearch());
    
    expect(result.current.searchTerm).toBe('');
    expect(result.current.users).toEqual([]);
    expect(result.current.selectedUser).toBeNull();
    expect(result.current.repos).toEqual([]);
    expect(result.current.isSearching).toBe(false);
    expect(result.current.isLoadingRepos).toBe(false);
  });

  test('handles search correctly', async () => {
    const mockUsers = [
      { 
        id: 1, 
        login: 'testuser',
        avatar_url: 'https://example.com/avatar.png',
        html_url: 'https://github.com/testuser'
      }
    ];
    mockSearchUsers.mockResolvedValue(mockUsers);
    
    const { result, waitForNextUpdate } = renderHook(() => useGitHubSearch());
    
    act(() => {
      result.current.setSearchTerm('test');
    });
    
    act(() => {
      result.current.handleSearch();
    });
    
    expect(result.current.isSearching).toBe(true);
    
    await waitForNextUpdate();
    
    expect(mockSearchUsers).toHaveBeenCalledWith('test');
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.isSearching).toBe(false);
  });

  test('handles user selection correctly', async () => {
    const mockRepos = [
      { 
        id: 1, 
        name: 'test-repo',
        description: 'Test description',
        html_url: 'https://github.com/testuser/test-repo',
        stargazers_count: 5,
        language: 'TypeScript',
        updated_at: new Date().toISOString()
      }
    ];
    mockGetUserRepos.mockResolvedValue(mockRepos);
    
    const { result, waitForNextUpdate } = renderHook(() => useGitHubSearch());
    
    act(() => {
      result.current.handleUserSelect('testuser');
    });
    
    expect(result.current.selectedUser).toBe('testuser');
    expect(result.current.isLoadingRepos).toBe(true);
    
    await waitForNextUpdate();
    
    expect(mockGetUserRepos).toHaveBeenCalledWith('testuser');
    expect(result.current.repos).toEqual(mockRepos);
    expect(result.current.isLoadingRepos).toBe(false);
  });

  test('deselects user when selecting the same user', () => {
    const { result } = renderHook(() => useGitHubSearch());
    
    // Set the selectedUser directly through handleUserSelect
    act(() => {
      result.current.handleUserSelect('testuser');
    });
    
    // Since we can't await the async function, manually set selectedUser for the test
    // This is a workaround since setSelectedUser is not exposed in the hook return values
    expect(result.current.selectedUser).toBe('testuser');
    
    // Now deselect by selecting the same user
    act(() => {
      result.current.handleUserSelect('testuser');
    });
    
    expect(result.current.selectedUser).toBeNull();
  });
});
