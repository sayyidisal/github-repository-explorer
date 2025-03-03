
import { useGitHubSearch } from "@/hooks/useGitHubSearch";
import SearchForm from "@/components/SearchForm";
import UserList from "@/components/UserList";
import RepositoryList from "@/components/RepositoryList";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const Index = () => {
  const {
    searchTerm,
    setSearchTerm,
    users,
    selectedUser,
    repos,
    isSearching,
    isLoadingRepos,
    handleSearch,
    handleUserSelect,
  } = useGitHubSearch();

  // Handle Ctrl+Enter to submit search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && searchTerm.trim()) {
        e.preventDefault();
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchTerm, handleSearch]);

  return (
    <div className="min-h-screen bg-gray-100 py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">GitHub Explorer</h1>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            isSearching={isSearching}
            hideHint={false}
          />
          
          {users.length > 0 && (
            <div className="mt-6">
              <UserList
                users={users}
                selectedUser={selectedUser}
                onSelectUser={handleUserSelect}
                searchTerm={searchTerm}
              />
            </div>
          )}
          
          {selectedUser && (
            <div className="mt-6">
              <div className="user-card flex justify-between items-center mb-4 user-active">
                <span className="font-medium">{selectedUser}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="chevron-icon rotate-180"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
              <RepositoryList
                repos={repos}
                username={selectedUser}
                isLoading={isLoadingRepos}
              />
            </div>
          )}
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;
