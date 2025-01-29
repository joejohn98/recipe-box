import { Save } from "lucide-react";
import { Recipe } from "../../context/RecipeContext";

const EditForm: React.FC<{
  recipe: Omit<Recipe, "id">;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onIngredientsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
}> = ({ recipe, onChange, onIngredientsChange, onSave }) => (
  <div className="p-6 space-y-6">
    <input
      type="text"
      name="name"
      value={recipe.name}
      onChange={onChange}
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
          value={recipe.cookingTime}
          onChange={onChange}
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
          value={recipe.difficulty}
          onChange={onChange}
          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>

    <div className="space-y-4">
      <input
        type="text"
        name="image"
        value={recipe.image}
        onChange={onChange}
        placeholder="Image URL"
        className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
      />
      <input
        type="text"
        name="cuisine"
        value={recipe.cuisine}
        onChange={onChange}
        placeholder="Cuisine Type"
        className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Ingredients (one per line)
      </label>
      <textarea
        name="ingredients"
        value={recipe.ingredients.join("\n")}
        onChange={onIngredientsChange}
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
        value={recipe.instructions}
        onChange={onChange}
        className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
        rows={5}
      />
    </div>

    <button
      onClick={onSave}
      className="w-full flex items-center justify-center p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
    >
      <Save className="h-5 w-5 mr-2" />
      Save Changes
    </button>
  </div>
);

export default EditForm;
