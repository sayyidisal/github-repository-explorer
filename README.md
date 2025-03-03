
# GitHub Repository Explorer

A sleek and interactive React application that seamlessly integrates with the GitHub API to search for users and explore their repositories.

## 🚀 Features

- **🔎 User Search**: Find GitHub users with similar usernames (up to 5 users shown)
- **📂 Repository Exploration**: View all repositories for any selected GitHub user
- **🎨 User-Friendly UI**: Clean, minimalist interface with a responsive design
- **♿ Accessibility Features**:
  - Keyboard shortcuts (`Ctrl+K` to focus search, `Ctrl+Enter` to submit)
  - Arrow key navigation in user list
  - Screen reader-friendly components
- **⏳ Comprehensive Loading States**: Visual feedback during API calls
- **⚠️ Robust Error Handling**: Graceful error management with informative messages

## 🛠️ Technologies Used

- **React** - Modern UI library
- **TypeScript** - Static typing for better maintainability
- **TanStack Query** - Efficient data fetching and caching
- **Tailwind CSS** - Utility-first styling for rapid development
- **shadcn/ui** - Elegant and accessible component library
- **date-fns** - Lightweight date formatting
- **Lucide React** - Crisp and customizable icons
- **Testing Library** - Reliable unit and integration testing

## 🏃‍♂️ Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/sayyidisal/github-repository-explorer.git
   cd github-repository-explorer
   ```

2. **Install dependencies**
   ```sh
   npm install  # or yarn
   ```

3. **Start the development server**
   ```sh
   npm run dev  # or yarn dev
   ```

4. **Open in your browser**
   [http://localhost:8080](http://localhost:8080)

## 🎮 Usage

1. **Search for Users**: Enter a GitHub username and press `Enter` or click "Search"
2. **View User Details**: Click on any user from the search results to view their repositories
3. **Explore Repositories**: Browse through repositories and see details like:
   - ⭐ Star count
   - 🔧 Primary language
   - 🕒 Last update time
   - 🔁 Fork count
4. **Keyboard Shortcuts**:
   - `Ctrl+K` → Focus search input
   - `Ctrl+Enter` → Submit search
   - `↑ / ↓` → Navigate user list

## ⚠️ API Rate Limiting

This application uses the GitHub public API, which has rate limits:
- **Unauthenticated requests**: 60 requests per hour per IP

To increase the rate limit, consider implementing authentication.

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

## 🔮 Potential Enhancements

- 🔑 Add authentication to increase API rate limits
- 📜 Implement pagination for repositories
- 📌 Add sorting and filtering options for repositories
- 📖 Create detailed views for repositories
- ✅ Expand test coverage for reliability

## 👤 Author

**Sayyid Syalahuddin**

- GitHub: [@sayyidisal](https://github.com/sayyidisal)
- LinkedIn: [Sayyid Syalahuddin](https://www.linkedin.com/in/sayyid-shalahuddin-431033166/)

## 📝 License

This project is licensed under the **MIT License**.
