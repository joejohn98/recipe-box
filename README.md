# Recipe Hub 🍳

A modern, feature-rich recipe management application built with React, TypeScript, and Tailwind CSS. Recipe Hub helps users manage, discover, and organize their favorite recipes with a beautiful and intuitive interface.

## ✨ Features

- 📱 Responsive design for all devices
- 🌓 Dark/Light theme support
- ✨ Modern, clean UI with Tailwind CSS
- 💾 Local storage persistence
- 📝 Add recipe functionality
- 🖨️ Print-friendly recipe details for easy sharing
- ⭐ Favorite recipes functionality
- 🔍 Recipe filtering and search
- 📸 Image support with fallback handling
- 🚀 Fast and responsive UI
- 🔔 Toast notifications for user feedback

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/        # Shared UI components
│   ├── form/         # Form-related components
│   │   ├── AddRecipe.tsx
│   │   └── RecipeForm.tsx
│   ├── layout/       # Layout components
│   │   └── Header.tsx
│   └── recipe/       # Recipe-specific components
│       ├── RecipeList.tsx
│       ├── RecipeDetail.tsx
│       └── RecipeCard.tsx
├── context/
│   ├── RecipeContext.tsx  # Recipe state management
│   └── ThemeContext.tsx   # Theme management
├── data/
│   └── index.ts      # Default recipe data
└── App.tsx           # Main application component
```

## 🛠️ Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hot Toast
- UUID for unique IDs
- Lucide React (Icons)
- Vite (Build tool)

## 📋 Recipe Data Structure

Each recipe includes:

- Unique ID
- Name
- Ingredients list
- Cooking instructions
- Cuisine type
- Image URL
- Cooking time
- Difficulty level (easy/medium/hard)
- Favorite status

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/joejohn98/recipe-box.git
cd recipe-hub
```

2. Install dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🧰 Component Details

### Core Components

#### Layout

- `Header`: Main navigation and theme toggle

#### Recipe Components

- `RecipeList`: Displays grid of available recipes
- `RecipeDetail`: Shows detailed recipe information
- `RecipeView`: Displays recipe information with actions

#### Form Components

- `AddRecipe`: New recipe creation form
- `EditForm`: Recipe edit form

### Context Providers

#### RecipeContext

Manages recipe state with features:

- Add/Update/Delete recipes
- Toggle favorites
- Image error handling
- Local storage persistence

#### ThemeContext

Handles theme switching functionality:

- Dark/Light mode toggle
- Theme persistence

## 💻 Development

### Code Quality Tools

- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- PostCSS for CSS processing

Run linting:

```bash
npm run lint
```
