import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
import RecipeList from "./components/RecipeList";
import Header from "./components/Header";
import AddRecipe from "./components/AddRecipe";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <ThemeProvider>
      <RecipeProvider>
       <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
         <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<RecipeList/>} />
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetail/>} />
          </Routes>
         </main>
        </div>
        <Toaster position="top-right"/>
       </Router>
      </RecipeProvider>
    </ThemeProvider>
  );
}

export default App;
