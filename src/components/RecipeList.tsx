import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import { Search, Clock, Activity, Heart, BookmarkCheck } from "lucide-react";

const RecipeList: React.FC = () => {
  const { recipes, toggleFavorite } = useRecipes();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredRecipes = recipes.filter((recipe) => {
    const searchValue = searchTerm.toLowerCase();
    const matchesSearch =
      searchCategory === "name"
        ? recipe.name.toLowerCase().includes(searchValue)
        : searchCategory === "ingredients"
        ? recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchValue)
          )
        : recipe.cuisine.toLowerCase().includes(searchValue);

    return showFavoritesOnly
      ? matchesSearch && recipe.isFavorite
      : matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "easy") {
      return "text-green-500 dark:text-green-400";
    } else if (difficulty === "medium") {
      return "text-yellow-500 dark:text-yellow-400";
    } else if (difficulty === "hard") {
      return "text-red-500 dark:text-red-400";
    } else {
      return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <div className="flex space-x-4">
            {["name", "ingredients", "cuisine"].map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={category}
                  checked={searchCategory === category}
                  onChange={() => setSearchCategory(category)}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-gray-700 dark:text-gray-200 capitalize">
                  {category}
                </span>
              </label>
            ))}
          </div>
          <label className="flex items-center space-x-2 ml-auto">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className="text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-gray-700 dark:text-gray-200 flex items-center gap-1">
              <BookmarkCheck className="h-4 w-4" />
              Favorites Only
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <Link to={`/recipe/${recipe.id}`}>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {recipe.name}
                </h2>
                <p className="text-emerald-600 dark:text-emerald-400 mb-2">
                  {recipe.cuisine}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.cookingTime} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    <span className={getDifficultyColor(recipe.difficulty)}>
                      {recipe.difficulty.charAt(0).toUpperCase() +
                        recipe.difficulty.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(recipe.id);
              }}
              className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-200 ${
                recipe.isFavorite
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-red-500"
              }`}
              aria-label={
                recipe.isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className="h-5 w-5"
                fill={recipe.isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecipeList;
