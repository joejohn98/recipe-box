import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, UtensilsCrossed } from "lucide-react";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-gray-800 dark:text-white"
          >
            <UtensilsCrossed className="h-8 w-8" />
            <span>Recipe Box</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-6 w-6 text-gray-800 dark:text-white" />
              ) : (
                <Sun className="h-6 w-6 text-gray-800 dark:text-white" />
              )}
            </button>
            <Link
              to="/add"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Add Recipe</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
