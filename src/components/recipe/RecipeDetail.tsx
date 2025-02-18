import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes, Recipe } from "../../context/RecipeContext";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import EditForm from "../form/EditForm";
import RecipeView from "./RecipeView";
import { printRecipe } from "../../utils/printUtils";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    recipes,
    isLoading,
    deleteRecipe,
    updateRecipe,
    toggleFavorite,
    imageError,
    handleImageError,
  } = useRecipes();
  const recipe = recipes.find((r) => r.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<Omit<Recipe, "id"> | null>(
    null
  );

  useEffect(() => {
    if (recipe) {
      setEditedRecipe({
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        cuisine: recipe.cuisine,
        image: recipe.image,
        cookingTime: recipe.cookingTime,
        difficulty: recipe.difficulty,
        isFavorite: recipe.isFavorite,
      });
    }
  }, [recipe]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] mt-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

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
    if (recipe) {
      printRecipe(recipe);
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
