export const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "easy") {
      return "text-green-500 dark:text-green-400";
    } else if (difficulty === "medium") {
      return "text-yellow-500 dark:text-yellow-400";
    } else if (difficulty === "hard") {
      return "text-red-500 dark:text-red-400";
    } else {
      return "";
    }
  };
