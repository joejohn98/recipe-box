import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes, Recipe } from "../../context/RecipeContext";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    recipes,
    deleteRecipe,
    updateRecipe,
    toggleFavorite,
    imageError,
    handleImageError,
  } = useRecipes();
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

  const handleEdit = () => setIsEditing(true);

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
          <EditForm
            recipe={editedRecipe}
            onChange={handleChange}
            onIngredientsChange={handleIngredientsChange}
            onSave={handleSave}
          />
        ) : (
          <RecipeView
            recipe={recipe}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPrint={handlePrint}
            onToggleFavorite={() => toggleFavorite(recipe.id)}
            imageError={imageError}
            handleImageError={handleImageError}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
