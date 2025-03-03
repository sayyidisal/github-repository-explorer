
import { GitHubRepo } from "@/types/github";
import { Star, GitBranch, Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RepositoryListProps {
  repos: GitHubRepo[];
  username: string;
  isLoading: boolean;
}

const RepositoryList = ({ repos, username, isLoading }: RepositoryListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="repo-card" data-testid="repo-skeleton">
            <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-sm w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (repos.length === 0) return null;

  return (
    <div className="space-y-3 animate-fade-in">
      {repos.map((repo) => (
        <a 
          key={repo.id} 
          className="repo-card block"
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-label={`Repository ${repo.name}`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold group flex items-center gap-1">
              {repo.name}
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <span>{repo.stargazers_count}</span>
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
          
          {repo.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {repo.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            {repo.language && (
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>Updated {formatDistanceToNow(new Date(repo.updated_at))} ago</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default RepositoryList;
