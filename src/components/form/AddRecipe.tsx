import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe, useRecipes } from "../../context/RecipeContext";
import toast from "react-hot-toast";
import { Plus, Clock, Activity } from "lucide-react";

const AddRecipe: React.FC = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const [recipe, setRecipe] = useState<Omit<Recipe, "id">>({
    name: "",
    ingredients: [""],
    instructions: "",
    cuisine: "",
    image: "",
    cookingTime: 30,
    difficulty: "medium" as "easy" | "medium" | "hard",
    isFavorite: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const ingredients = e.target.value
      .split("\n")
      .filter((ingredient) => ingredient.trim() !== "");
    setRecipe((prev) => ({ ...prev, ingredients }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecipe(recipe);
    toast.success("Recipe added successfully");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Plus className="h-8 w-8" />
        Add New Recipe
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Recipe Name
          </label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:focus:ring-emerald-400 transition-colors duration-200"
            placeholder="Enter recipe name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className=" text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:focus:ring-emerald-400 transition-colors duration-200"
            />
          </div>

          <div>
            <label className=" text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:focus:ring-emerald-400 transition-colors duration-200"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            name="ingredients"
            value={recipe.ingredients.join("\n")}
            onChange={handleIngredientsChange}
            required
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:focus:ring-emerald-400 transition-colors duration-200"
            rows={5}
            placeholder="Enter ingredients, one per line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:focus:ring-emerald-400 transition-colors duration-200"
            rows={5}
            placeholder="Enter cooking instructions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Cuisine Type
          </label>
          <input
            type="text"
            name="cuisine"
            value={recipe.cuisine}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
            placeholder="Enter cuisine type"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:focus:ring-emerald-400  transition-colors duration-200"
            placeholder="Enter image URL"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Recipe
        </button>
      </form>
    </div>
  );
};
export default AddRecipe;
