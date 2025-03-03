
# GitHub Repository Explorer

A clean, interactive React application that integrates with the GitHub API to search for users and explore their repositories.

## 🚀 Features

- **User Search**: Find GitHub users with similar usernames (up to 5 users shown)
- **Repository Exploration**: View all repositories for any selected GitHub user
- **User-Friendly UI**: Clean, minimalist interface with responsive design
- **Accessibility Features**: 
  - Keyboard shortcuts (Ctrl+K to focus search, Ctrl+Enter to submit)
  - Arrow key navigation in user list
  - Screen reader friendly components
- **Comprehensive Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error management with informative messages

## 🛠️ Technologies Used

- **React** - UI library
- **TypeScript** - Static typing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **date-fns** - Date formatting
- **Lucide React** - Icon library
- **Testing Library** - Unit and integration testing

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/github-repo-explorer.git
cd github-repo-explorer
```

2. Install dependencies
```sh
npm install
# or
yarn
```

3. Start the development server
```sh
npm run dev
# or
yarn dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## 🎮 Usage

1. **Search for Users**: Enter a GitHub username in the search box and press Enter or click "Search"
2. **View User Details**: Click on any user from the results to view their repositories
3. **Explore Repositories**: Browse through repositories to see details like:
   - Star count
   - Primary language
   - Last update time
   - Fork count
4. **Keyboard Navigation**:
   - `Ctrl+K` to focus the search input
   - `Ctrl+Enter` to submit search
   - Arrow keys to navigate user list

## ⚠️ API Rate Limiting

This application uses the GitHub public API which has rate limiting:
- Unauthenticated requests: 60 requests per hour per IP address

## 📁 Project Structure

```
src/
├── api/            # API services for GitHub
├── components/     # UI components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── types/          # TypeScript interfaces
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## 🔮 Potential Improvements

- Add authentication to increase API rate limits
- Implement pagination for repositories
- Add sorting and filtering options for repositories
- Create detailed views for repositories
- Add more comprehensive tests

## 👤 Author

**Sayyid Syalahuddin**
- GitHub: [https://github.com/sayyidisal](https://github.com/sayyidisal)
- LinkedIn: [https://www.linkedin.com/in/sayyid-shalahuddin-431033166/](https://www.linkedin.com/in/sayyid-shalahuddin-431033166/)

## 📝 License

MIT
