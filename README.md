# <img src="https://raw.githubusercontent.com/git/git-scm.com/main/public/images/logos/downloads/Git-Icon-1788C.png" width="40" height="40" alt="Git Logo"> gitLearn

<div align="center">

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**An interactive learning platform to master Git and GitHub through hands-on simulations and visualizations**

[Features](#-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## 📖 About

**gitLearn** is a modern, interactive web application designed to make learning Git and GitHub concepts intuitive and engaging. Instead of reading documentation, users can visualize Git operations in real-time, experiment with branching strategies, and practice workflows through interactive simulators.

Whether you're a complete beginner or looking to solidify your understanding of version control, gitLearn provides a safe, visual environment to experiment with Git commands and GitHub workflows without the fear of breaking anything.

## ✨ Features

### 📚 Core Learning Sections

- **🔧 Git Init** - Learn how to initialize a Git repository
- **📝 Staging & Committing** - Understand the staging area and commit workflow
- **🌿 Branching** - Master branch creation and navigation
- **🔀 Merging** - Learn how to merge branches and resolve conflicts
- **☁️ Remote Repositories** - Understand push, pull, and remote operations
- **🔄 GitHub Flow** - Learn the standard GitHub workflow for collaboration

### 🎮 Interactive Simulators

1. **Interactive Playground** - A full-featured Git sandbox where you can:
   - Create and switch between branches
   - Make commits with custom messages
   - Stage and unstage files
   - Visualize commit history as a graph
   - Merge branches and see the results

2. **Push/Pull Simulator** - Practice remote repository operations:
   - Simulate pushing commits to remote
   - Practice pulling changes
   - Understand remote tracking branches

3. **Pull Request Flow Simulator** - Learn the GitHub collaboration workflow:
   - Create feature branches
   - Open pull requests
   - Review and merge PRs
   - Understand the complete GitHub workflow

### 🎨 Visual Features

- **Animated Git Graphs** - Beautiful visualizations of commit history and branch relationships
- **Interactive Terminal** - Simulated terminal interface showing Git commands
- **Real-time Feedback** - See the results of your actions immediately
- **Modern UI** - Clean, responsive design with smooth animations
- **Dark Mode Support** - Comfortable viewing in any lighting condition

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AP2611/git-learn.git
   cd git-learn
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:8080`
   - Start learning! 🎉

### Build for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
bun run preview
```

## 🛠️ Tech Stack

### Core Technologies

- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[React Router](https://reactrouter.com/)** - Client-side routing

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Icon library

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Testing Library](https://testing-library.com/)** - React testing utilities

## 📁 Project Structure

```
git-learn/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── sections/       # Learning section components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── GitInitSection.tsx
│   │   │   ├── StagingCommitSection.tsx
│   │   │   ├── BranchingSection.tsx
│   │   │   ├── MergingSection.tsx
│   │   │   ├── RemoteSection.tsx
│   │   │   ├── GitHubFlowSection.tsx
│   │   │   ├── InteractivePlayground.tsx
│   │   │   ├── InteractivePushPull.tsx
│   │   │   └── InteractivePRFlow.tsx
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navbar.tsx
│   │   ├── CommitNode.tsx
│   │   ├── BranchLine.tsx
│   │   └── TerminalWindow.tsx
│   ├── pages/              # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── test/               # Test files
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── package.json
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Usage

### For Learners

1. **Start with the Basics** - Scroll down from the hero section to begin with Git initialization
2. **Follow the Sections** - Each section builds on the previous one
3. **Try the Simulators** - Use the interactive playgrounds to practice what you've learned
4. **Experiment Freely** - The simulators are safe spaces to try different Git operations

### Navigation

- Use the navigation bar to jump to specific sections
- Scroll through the page for a linear learning experience
- Click on "🎮 Try the Sandbox" to go directly to the interactive playground

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
# or
bun test
```

Run tests in watch mode:

```bash
npm run test:watch
# or
yarn test:watch
# or
bun run test:watch
```

## 📝 Contributing

Contributions are welcome! If you'd like to improve gitLearn:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with ❤️ to make Git less scary
- Inspired by the need for better Git learning resources
- Every expert was once a beginner → `git commit -m "keep learning"`

## 🔗 Links

- **Repository**: [https://github.com/AP2611/git-learn](https://github.com/AP2611/git-learn)
- **Issues**: [Report a bug or request a feature](https://github.com/AP2611/git-learn/issues)

---

<div align="center">

**Made with ❤️ by the gitLearn team**

⭐ Star this repo if you find it helpful!

</div>
