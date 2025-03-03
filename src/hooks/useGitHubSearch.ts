
import { searchUsers, getUserRepos } from "@/api/github";
import { GitHubRepo, GitHubUser } from "@/types/github";
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useGitHubSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSelectedUser(null);
    setRepos([]);

    try {
      const foundUsers = await searchUsers(searchTerm);
      setUsers(foundUsers);
      
      if (foundUsers.length === 0) {
        toast({
          title: "No users found",
          description: `No GitHub users match "${searchTerm}"`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search users",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  }, [searchTerm, toast]);

  const handleUserSelect = useCallback(async (username: string) => {
    if (selectedUser === username) {
      setSelectedUser(null);
      setRepos([]);
      return;
    }

    setSelectedUser(username);
    setIsLoadingRepos(true);
    setRepos([]);

    try {
      const userRepos = await getUserRepos(username);
      setRepos(userRepos);
      
      if (userRepos.length === 0) {
        toast({
          title: "No repositories",
          description: `${username} has no public repositories`,
        });
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
      toast({
        title: "Failed to load repositories",
        description: error instanceof Error ? error.message : "An error occurred while fetching repositories",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRepos(false);
    }
  }, [selectedUser, toast]);

  return {
    searchTerm,
    setSearchTerm,
    users,
    selectedUser,
    repos,
    isSearching,
    isLoadingRepos,
    handleSearch,
    handleUserSelect,
  };
};
