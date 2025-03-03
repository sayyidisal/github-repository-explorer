
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';
import { GitHubUser } from '@/types/github';

const mockUsers: GitHubUser[] = [
  {
    id: 1,
    login: 'testuser1',
    avatar_url: 'https://example.com/avatar1.png',
    html_url: 'https://github.com/testuser1',
    type: 'User',
  },
  {
    id: 2,
    login: 'testuser2',
    avatar_url: 'https://example.com/avatar2.png',
    html_url: 'https://github.com/testuser2',
    type: 'User',
  },
];

describe('UserList', () => {
  test('renders users correctly', () => {
    render(
      <UserList 
        users={mockUsers} 
        selectedUser={null} 
        onSelectUser={jest.fn()} 
        searchTerm="test" 
      />
    );
    
    expect(screen.getByText('Results for "test"')).toBeInTheDocument();
    expect(screen.getByText('testuser1')).toBeInTheDocument();
    expect(screen.getByText('testuser2')).toBeInTheDocument();
  });

  test('calls onSelectUser when user is clicked', () => {
    const mockOnSelectUser = jest.fn();
    
    render(
      <UserList 
        users={mockUsers} 
        selectedUser={null} 
        onSelectUser={mockOnSelectUser} 
        searchTerm="test" 
      />
    );
    
    fireEvent.click(screen.getByText('testuser1'));
    expect(mockOnSelectUser).toHaveBeenCalledWith('testuser1');
  });

  test('renders active state for selected user', () => {
    render(
      <UserList 
        users={mockUsers} 
        selectedUser="testuser1" 
        onSelectUser={jest.fn()} 
        searchTerm="test" 
      />
    );
    
    const userElement = screen.getByText('testuser1').closest('.user-card');
    expect(userElement).toHaveClass('user-active');
  });
});
