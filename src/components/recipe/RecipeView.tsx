import { Activity, Clock, Printer, Heart, Trash2, Edit2 } from "lucide-react";

import { UtensilsCrossed } from "lucide-react";
import { Recipe } from "../../context/RecipeContext";

const RecipeView: React.FC<{
  recipe: Recipe;
  onEdit: () => void;
  onDelete: () => void;
  onPrint: () => void;
  onToggleFavorite: () => void;
  imageError: Record<string, boolean>;
  handleImageError: (id: string) => void;
}> = ({
  recipe,
  onEdit,
  onDelete,
  onPrint,
  onToggleFavorite,
  imageError,
  handleImageError,
}) => {
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
    <>
      {!imageError[recipe.id] ? (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-[400px] object-cover"
          onError={() => handleImageError(recipe.id)}
        />
      ) : (
        <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <UtensilsCrossed className="h-12 w-12 text-gray-400" />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {recipe.name}
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 text-lg">
              {recipe.cuisine}
            </p>
            <div className="flex items-center gap-4 mt-2 text-gray-600 dark:text-gray-300">
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
          <div className="flex space-x-2">
            <button
              onClick={onToggleFavorite}
              className={`p-2 transition-colors duration-200 ${
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
            <button
              onClick={onPrint}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
              aria-label="Print recipe"
            >
              <Printer className="h-5 w-5" />
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
              aria-label="Edit recipe"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-200"
              aria-label="Delete recipe"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Instructions
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default RecipeView;
