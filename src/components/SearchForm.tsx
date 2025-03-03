
import { FormEvent, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFormProps {
  onSearch: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
  hideHint?: boolean;
}

const SearchForm = ({ 
  onSearch, 
  searchTerm, 
  setSearchTerm, 
  isSearching,
  hideHint = false 
}: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  // Focus input when Ctrl+K is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full" role="form" aria-label="Search GitHub users">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search GitHub users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 pl-10 pr-4 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          autoComplete="off"
          aria-label="Search for GitHub users"
          disabled={isSearching}
          ref={inputRef}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSearching || !searchTerm.trim()}
          aria-label={isSearching ? "Searching..." : "Search"}
        >
          {isSearching ? "..." : "Search"}
        </button>
      </div>
      
      {!hideHint && (
        <div className="text-xs text-muted-foreground mt-2 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-muted border rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="px-1.5 py-0.5 bg-muted border rounded text-xs">K</kbd> to focus search
        </div>
      )}
    </form>
  );
};

export default SearchForm;
