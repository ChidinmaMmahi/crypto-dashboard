import { FaArrowDownAZ, FaArrowUp19, FaArrowDown19 } from "react-icons/fa6";

type CryptoControlsProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortMode: "alpha" | "high" | "low" | "";
  toggleSort: () => void;
  currency: string;
  setCurrency: (value: string) => void;
  currencies: string[];
};

export const CryptoControls = ({
  searchTerm,
  setSearchTerm,
  sortMode,
  toggleSort,
  currency,
  setCurrency,
  currencies,
}: CryptoControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3 fixed left-0 right-0 z-20 px-6 py-4 dark:border-gray-800 bg-gray-100/60 backdrop-blur-md dark:bg-gray-900">
      {/* Search Input */}
      <div className="relative w-full sm:w-1/3">
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-500 hover:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white
             placeholder:text-gray-400
             focus:outline-none focus:border-gray-400
             focus:shadow-[0_0_10px_2px_rgba(168,85,247,0.5)]
             transition duration-200"
        />
      </div>

      {/* Sort and Currency Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSort}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 cursor-pointer dark:bg-gray-800 rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {sortMode === "alpha" && <FaArrowDownAZ size={18} />}
          {sortMode === "high" && <FaArrowDown19 size={18} />}
          {sortMode === "low" && <FaArrowUp19 size={18} />}
          {sortMode === "" && <FaArrowDownAZ size={18} />}
          <span className="text-sm">Sort</span>
        </button>

        <div className="bg-purple-800 hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded-sm cursor-pointer">
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border-none outline-none cursor-pointer bg-purple-800 text-white"
          >
            {currencies.map((cur) => (
              <option value={cur} key={cur}>
                {cur.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
