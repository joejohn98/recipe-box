import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultRecipes } from "../data/defaultRecipes";

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  cuisine: string;
  image: string;
  cookingTime: number; // in minutes
  difficulty: "easy" | "medium" | "hard";
  isFavorite: boolean;
}

interface RecipeContextType {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  imageError: Record<string, boolean>;
  addRecipe: (recipe: Omit<Recipe, "id">) => void;
  deleteRecipe: (id: string) => void;
  updateRecipe: (id: string, recipe: Omit<Recipe, "id">) => void;
  toggleFavorite: (id: string) => void;
  getFavorites: () => Recipe[];
  handleImageError: (recipeId: string) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadRecipes = () => {
      try {
        const savedRecipes = localStorage.getItem("recipes");
        if (!savedRecipes || JSON.parse(savedRecipes).length === 0) {
          setRecipes(defaultRecipes);
        } else {
          setRecipes(JSON.parse(savedRecipes));
        }
      } catch {
        setError("Failed to load recipes. Using default recipes instead.");
        setRecipes(defaultRecipes);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  console.log(recipes);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && !error) {
      try {
        localStorage.setItem("recipes", JSON.stringify(recipes));
      } catch {
        setError("Failed to save recipes to local storage.");
      }
    }
  }, [recipes, isLoading, error]);

  const addRecipe = (recipe: Omit<Recipe, "id">) => {
    const newRecipe = { ...recipe, id: uuidv4() };
    // If this is the first user-added recipe, clear default recipes
    const isFirstUserRecipe = recipes.every(r => defaultRecipes.some(dr => dr.id === r.id));
    setRecipes(isFirstUserRecipe ? [newRecipe] : [...recipes, newRecipe]);
  };

  const deleteRecipe = (id: string) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const updateRecipe = (id: string, updatedRecipe: Omit<Recipe, "id">) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...updatedRecipe, id } : recipe
      )
    );
    setImageError((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const toggleFavorite = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  const getFavorites = () => {
    return recipes.filter((recipe) => recipe.isFavorite);
  };

  const handleImageError = (recipeId: string) => {
    setImageError((prev) => ({ ...prev, [recipeId]: true }));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        isLoading,
        error,
        imageError,
        handleImageError,
        addRecipe,
        deleteRecipe,
        updateRecipe,
        toggleFavorite,
        getFavorites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
};
