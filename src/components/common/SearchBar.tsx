import { BookmarkCheck } from "lucide-react";
import { Search } from "lucide-react";

const SearchBar: React.FC<{
  searchTerm: string;
  searchCategory: string;
  showFavoritesOnly: boolean;
  onSearchTermChange: (term: string) => void;
  onSearchCategoryChange: (category: string) => void;
  onFavoritesToggle: (show: boolean) => void;
}> = ({
  searchTerm,
  searchCategory,
  showFavoritesOnly,
  onSearchTermChange,
  onSearchCategoryChange,
  onFavoritesToggle,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
    <div className="relative">
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors duration-200"
      />
    </div>
    <div className="flex flex-wrap items-center gap-4 mt-3">
      <div className="flex space-x-4">
        {["name", "ingredients", "cuisine"].map((category) => (
          <label key={category} className="flex items-center space-x-2">
            <input
              type="radio"
              value={category}
              checked={searchCategory === category}
              onChange={() => onSearchCategoryChange(category)}
              className="text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-gray-700 dark:text-gray-200 capitalize">
              {category}
            </span>
          </label>
        ))}
      </div>
      <label className="flex items-center space-x-2 ml-auto">
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={(e) => onFavoritesToggle(e.target.checked)}
          className="text-emerald-500 focus:ring-emerald-500"
        />
        <span className="text-gray-700 dark:text-gray-200 flex items-center gap-1">
          <BookmarkCheck className="h-4 w-4" />
          Favorites Only
        </span>
      </label>
    </div>
  </div>
);
export default SearchBar;
