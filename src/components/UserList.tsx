
import { GitHubUser } from "@/types/github";
import { ChevronDown, User } from "lucide-react";
import { useEffect, useRef } from "react";

interface UserListProps {
  users: GitHubUser[];
  selectedUser: string | null;
  onSelectUser: (username: string) => void;
  searchTerm: string;
}

const UserList = ({ users, selectedUser, onSelectUser, searchTerm }: UserListProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  // Handle keyboard navigation within the user list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!listRef.current || users.length === 0) return;
      
      const focusableItems = Array.from(
        listRef.current.querySelectorAll<HTMLLIElement>('.user-card')
      );
      
      // Find the currently focused item
      const focusedItem = document.activeElement as HTMLLIElement;
      const focusedIndex = focusableItems.indexOf(focusedItem);
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (focusedIndex === -1 || focusedIndex === focusableItems.length - 1) {
            focusableItems[0]?.focus();
          } else {
            focusableItems[focusedIndex + 1]?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (focusedIndex === -1 || focusedIndex === 0) {
            focusableItems[focusableItems.length - 1]?.focus();
          } else {
            focusableItems[focusedIndex - 1]?.focus();
          }
          break;
        case 'Enter':
          if (focusedIndex !== -1) {
            e.preventDefault();
            const username = users[focusedIndex].login;
            onSelectUser(username);
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [users, onSelectUser]);

  if (users.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <p className="text-sm mb-4 text-gray-600">
        Results for "{searchTerm}"
      </p>
      <ul className="space-y-2" ref={listRef}>
        {users.map((user) => (
          <li
            key={user.id}
            className={`user-card flex justify-between items-center cursor-pointer ${
              selectedUser === user.login ? "user-active" : ""
            }`}
            onClick={() => onSelectUser(user.login)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectUser(user.login);
              }
            }}
            tabIndex={0}
            aria-selected={selectedUser === user.login}
            role="option"
          >
            <div className="flex items-center gap-2">
              <User size={18} className="text-gray-500" />
              <span className="font-medium">{user.login}</span>
            </div>
            <ChevronDown 
              size={18} 
              className={`chevron-icon transition-transform ${
                selectedUser === user.login ? "rotate-180" : ""
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
