
export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type?: string; // Added type property
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  forks_count?: number; // Added forks_count property
  private?: boolean;
  fork?: boolean;
}

export interface GitHubSearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}
