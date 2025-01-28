import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes, Recipe } from "../context/RecipeContext";
import toast from "react-hot-toast";
import {
  Edit2,
  Trash2,
  Save,
  ArrowLeft,
  Clock,
  Activity,
  Heart,
  Printer,
} from "lucide-react";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, deleteRecipe, updateRecipe, toggleFavorite } = useRecipes();
  const recipe = recipes.find((r) => r.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<Omit<Recipe, "id"> | null>(
    recipe
      ? {
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          cuisine: recipe.cuisine,
          image: recipe.image,
          cookingTime: recipe.cookingTime,
          difficulty: recipe.difficulty,
          isFavorite: recipe.isFavorite,
        }
      : null
  );

  if (!recipe || !editedRecipe) {
    return (
      <div className="text-center py-12 text-gray-700 dark:text-gray-300">
        Recipe not found
      </div>
    );
  }

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    toast.success("Recipe deleted successfully");
    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedRecipe) {
      updateRecipe(recipe.id, editedRecipe);
      setIsEditing(false);
      toast.success("Recipe updated successfully");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedRecipe((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleIngredientsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const ingredients = e.target.value.split("\n");
    setEditedRecipe((prev) => (prev ? { ...prev, ingredients } : null));
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${recipe.name} - Recipe</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
              h1 { color: #333; }
              .meta { color: #666; margin-bottom: 20px; }
              .ingredients { margin-bottom: 20px; }
              .ingredients h2 { color: #444; }
              .instructions { line-height: 1.6; }
            </style>
          </head>
          <body>
            <h1>${recipe.name}</h1>
            <div class="meta">
              <p>Cuisine: ${recipe.cuisine}</p>
              <p>Cooking Time: ${recipe.cookingTime} minutes</p>
              <p>Difficulty: ${recipe.difficulty}</p>
            </div>
            <div class="ingredients">
              <h2>Ingredients</h2>
              <ul>
                ${recipe.ingredients
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}
              </ul>
            </div>
            <div class="instructions">
              <h2>Instructions</h2>
              <p>${recipe.instructions}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500 dark:text-green-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "hard":
        return "text-red-500 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Recipes
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
        {isEditing ? (
          <div className="p-6 space-y-6">
            <input
              type="text"
              name="name"
              value={editedRecipe.name}
              onChange={handleChange}
              className="w-full p-3 text-2xl font-bold border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Cooking Time (minutes)
                </label>
                <input
                  type="number"
                  name="cookingTime"
                  value={editedRecipe.cookingTime}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={editedRecipe.difficulty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <input
              type="text"
              name="image"
              value={editedRecipe.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
            />
            <input
              type="text"
              name="cuisine"
              value={editedRecipe.cuisine}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Ingredients (one per line)
              </label>
              <textarea
                name="ingredients"
                value={editedRecipe.ingredients.join("\n")}
                onChange={handleIngredientsChange}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
                rows={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Instructions
              </label>
              <textarea
                name="instructions"
                value={editedRecipe.instructions}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
                rows={5}
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              Save Changes
            </button>
          </div>
        ) : (
          <>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-[400px] object-cover"
            />
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
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`p-2 transition-colors duration-200 ${
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
                  <button
                    onClick={handlePrint}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
                    aria-label="Print recipe"
                  >
                    <Printer className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleEdit}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
                    aria-label="Edit recipe"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDelete}
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
        )}
      </div>
    </div>
  );
};
export default RecipeDetail;
