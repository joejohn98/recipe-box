import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../context/RecipeContext";

export const defaultRecipes: Recipe[] = [
  {
    id: uuidv4(),
    name: "Classic Margherita Pizza",
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup warm water",
      "2 1/4 tsp active dry yeast",
      "Fresh mozzarella",
      "Fresh basil leaves",
      "Tomato sauce",
      "Olive oil",
      "Salt",
    ],
    instructions:
      "1. Make the dough by mixing flour, water, yeast, and salt\n2. Let it rise for 1 hour\n3. Stretch the dough and add toppings\n4. Bake at 450°F for 12-15 minutes\n5. Garnish with fresh basil",
    cuisine: "Italian",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    cookingTime: 90,
    difficulty: "medium",
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: "Chicken Teriyaki",
    ingredients: [
      "4 chicken breasts",
      "1/2 cup soy sauce",
      "1/4 cup mirin",
      "1/4 cup sake",
      "3 tbsp brown sugar",
      "Ginger",
      "Garlic",
      "Green onions",
    ],
    instructions:
      "1. Mix soy sauce, mirin, sake, and sugar for the sauce\n2. Cut chicken into bite-sized pieces\n3. Cook chicken until golden\n4. Add sauce and simmer until thickened\n5. Serve with rice and garnish with green onions",
    cuisine: "Japanese",
    image:
      "https://ohsweetbasil.com/wp-content/uploads/easy-teriyaki-chicken-recipe-2-scaled.jpg",
    cookingTime: 30,
    difficulty: "easy",
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: "Chocolate Chip Cookies",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 cup butter",
      "3/4 cup sugar",
      "3/4 cup brown sugar",
      "2 eggs",
      "2 cups chocolate chips",
      "1 tsp vanilla extract",
      "1 tsp baking soda",
    ],
    instructions:
      "1. Cream butter and sugars until fluffy\n2. Beat in eggs and vanilla\n3. Mix in dry ingredients\n4. Fold in chocolate chips\n5. Bake at 375°F for 10-12 minutes",
    cuisine: "American",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    cookingTime: 25,
    difficulty: "easy",
    isFavorite: false,
  },
];
