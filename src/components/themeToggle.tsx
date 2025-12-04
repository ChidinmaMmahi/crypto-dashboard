import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme, clearTheme, userSet } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 
                   bg-white dark:bg-gray-800 
                   text-gray-800 dark:text-gray-100 
                   hover:bg-gray-100 dark:hover:bg-gray-700 
                   transition"
      >
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>

      {userSet ? (
        <button
          onClick={clearTheme}
          className="text-sm underline text-gray-500 dark:text-gray-400"
        >
          Follow system
        </button>
      ) : (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Using system theme
        </span>
      )}
    </div>
  );
};
