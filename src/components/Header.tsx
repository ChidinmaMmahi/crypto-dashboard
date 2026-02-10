import {
  FaSortAlphaDown,
  FaArrowUp,
  FaArrowDown,
  FaTh,
  FaList,
} from "react-icons/fa";

type HeaderProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortMode: "alpha" | "high" | "low" | "";
  toggleSort: () => void;
  currency: string;
  setCurrency: (value: string) => void;
  currencies: string[];
  displayMode: "card" | "table";
  setDisplayMode: (mode: "card" | "table") => void;
};

export const Header = ({
  searchTerm,
  setSearchTerm,
  sortMode,
  toggleSort,
  currency,
  setCurrency,
  currencies,
  displayMode,
  setDisplayMode,
}: HeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between gap-4 lg:gap-x-8 sm:items-center px-4 lg:px-8 sm:shadow-lg fixed top-0 left-0 right-0 z-50 bg-gray-100 h-auto sm:h-20 py-4 sm:py-0">
      <h1 className="text-3xl !font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent !mb-0">
        CoinLytics
      </h1>

      {/* Search and Controls */}

      <div className="relative w-full sm:max-w-xl">
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-500 hover:border-purple-500
               focus:outline-none focus:border-gray-400
               focus:shadow-[0_0_10px_2px_rgba(168,85,247,0.5)]
               transition duration-200"
        />
      </div>

      {/* Sort, Display Mode and Currency Controls */}
      <div className="flex items-center justify-end gap-x-1 lg:gap-x-3">
        <button
          onClick={toggleSort}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 cursor-pointer rounded-md shadow hover:bg-gray-50"
        >
          {sortMode === "alpha" && <FaSortAlphaDown size={18} />}
          {sortMode === "high" && <FaArrowDown size={18} />}
          {sortMode === "low" && <FaArrowUp size={18} />}
          {sortMode === "" && <FaSortAlphaDown size={18} />}
          <span className="text-sm">Sort</span>
        </button>

        <button
          onClick={() =>
            setDisplayMode(displayMode === "card" ? "table" : "card")
          }
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 cursor-pointer rounded-md shadow hover:bg-gray-50"
        >
          {displayMode === "card" ? <FaList size={18} /> : <FaTh size={18} />}
          <span className="text-sm">
            {displayMode === "card" ? "Table" : "Cards"}
          </span>
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
    </header>
  );
};
