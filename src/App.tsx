import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
import RecipeList from "./components/RecipeList";

function App() {
  return (
    <ThemeProvider>
      <RecipeProvider>
       <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
         <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<RecipeList/>} />
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
