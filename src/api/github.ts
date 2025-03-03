
import { GitHubRepo, GitHubSearchUsersResponse, GitHubUser } from "@/types/github";

const BASE_URL = "https://api.github.com";

/**
 * Search for GitHub users by username
 * @param username The username to search for
 * @param limit The maximum number of users to return (default: 5)
 */
export const searchUsers = async (username: string, limit: number = 5): Promise<GitHubUser[]> => {
  if (!username.trim()) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/users?q=${encodeURIComponent(username)}&per_page=${limit}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch users");
    }

    const data: GitHubSearchUsersResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

/**
 * Get repositories for a GitHub user
 * @param username The username to get repositories for
 * @param limit The maximum number of repositories to return (default: 10)
 */
export const getUserRepos = async (username: string, limit: number = 10): Promise<GitHubRepo[]> => {
  if (!username.trim()) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${limit}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch repositories");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching repositories for ${username}:`, error);
    throw error;
  }
};
