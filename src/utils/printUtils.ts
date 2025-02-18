// src/utils/printUtils.tsx
import { Recipe } from "../context/RecipeContext";

export const generatePrintTemplate = (recipe: Recipe): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${recipe.name} - Recipe</title>
      <style>
        /* Print-specific styles */
        @media print {
          @page {
            margin: 2cm;
          }
        }
        
        /* General styles */
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
        }
        
        .recipe-header {
          border-bottom: 2px solid #333;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        
        h1 {
          color: #333;
          margin: 0 0 0.5rem 0;
        }
        
        .meta {
          color: #666;
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        
        .meta-item {
          padding: 0.5rem;
          background: #f5f5f5;
          border-radius: 4px;
        }
        
        .ingredients {
          margin-bottom: 2rem;
        }
        
        .ingredients h2,
        .instructions h2 {
          color: #444;
          border-bottom: 1px solid #ddd;
          padding-bottom: 0.5rem;
        }
        
        .ingredients ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        
        .ingredients li {
          margin-bottom: 0.5rem;
        }
        
        .instructions {
          white-space: pre-line;
        }
      </style>
    </head>
    <body>
      <div class="recipe-header">
        <h1>${recipe.name}</h1>
      </div>
      
      <div class="meta">
        <div class="meta-item">
          <strong>Cuisine:</strong> ${recipe.cuisine}
        </div>
        <div class="meta-item">
          <strong>Cooking Time:</strong> ${recipe.cookingTime} minutes
        </div>
        <div class="meta-item">
          <strong>Difficulty:</strong> ${
            recipe.difficulty.charAt(0).toUpperCase() +
            recipe.difficulty.slice(1)
          }
        </div>
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
        <div>${recipe.instructions}</div>
      </div>
      
      <footer style="margin-top: 2rem; text-align: center; color: #666; font-size: 0.9rem;">
        <p>Printed from Recipe Hub</p>
      </footer>
    </body>
    </html>
  `;
};

export const printRecipe = (recipe: Recipe): void => {
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(generatePrintTemplate(recipe));
    printWindow.document.close();
    printWindow.print();
  } else {
    console.error("Failed to open print window");
  }
};
