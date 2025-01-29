import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../../context/RecipeContext";
import { Clock, Activity, Heart, UtensilsCrossed } from "lucide-react";
import SearchBar from "../common/SearchBar";


const RecipeList: React.FC = () => {
  const {
    recipes,
    toggleFavorite,
    imageError,
    handleImageError,
    isLoading,
    error,
  } = useRecipes();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] mt-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] mt-16">
        <p className="text-red-500 dark:text-red-400 text-xl font-semibold">
          Error loading recipes. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBar
        searchTerm={searchTerm}
        searchCategory={searchCategory}
        showFavoritesOnly={showFavoritesOnly}
        onSearchTermChange={setSearchTerm}
        onSearchCategoryChange={setSearchCategory}
        onFavoritesToggle={setShowFavoritesOnly}
      />

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-300">
          No recipes found. Try adjusting your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <Link to={`/recipe/${recipe.id}`}>
                <div className="aspect-w-16 aspect-h-9">
                  {!imageError[recipe.id] ? (
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={() => handleImageError(recipe.id)}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <UtensilsCrossed className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
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
                  recipe.isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
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
      )}
    </div>
  );
};

export default RecipeList;
