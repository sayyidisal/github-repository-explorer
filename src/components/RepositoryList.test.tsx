
import { render, screen } from '@testing-library/react';
import RepositoryList from './RepositoryList';
import { GitHubRepo } from '@/types/github';

const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: 'test-repo-1',
    description: 'Test repo 1 description',
    html_url: 'https://github.com/testuser/test-repo-1',
    stargazers_count: 10,
    language: 'TypeScript',
    updated_at: new Date().toISOString(),
    forks_count: 5,
    private: false,
    fork: false,
  },
  {
    id: 2,
    name: 'test-repo-2',
    description: null,
    html_url: 'https://github.com/testuser/test-repo-2',
    stargazers_count: 5,
    language: 'JavaScript',
    updated_at: new Date().toISOString(),
    forks_count: 2,
    private: false,
    fork: false,
  },
];

describe('RepositoryList', () => {
  test('renders repository list correctly', () => {
    render(
      <RepositoryList 
        repos={mockRepos} 
        username="testuser" 
        isLoading={false} 
      />
    );
    
    expect(screen.getByText('test-repo-1')).toBeInTheDocument();
    expect(screen.getByText('Test repo 1 description')).toBeInTheDocument();
    expect(screen.getByText('test-repo-2')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument(); // stargazers count
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  test('renders loading skeleton when loading', () => {
    render(
      <RepositoryList 
        repos={[]} 
        username="testuser" 
        isLoading={true} 
      />
    );
    
    const skeletons = screen.getAllByTestId('repo-skeleton');
    expect(skeletons.length).toBe(3);
  });

  test('renders nothing when no repositories and not loading', () => {
    const { container } = render(
      <RepositoryList 
        repos={[]} 
        username="testuser" 
        isLoading={false} 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });
});
