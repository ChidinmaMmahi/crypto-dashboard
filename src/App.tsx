import { useState } from "react";
import { Header, Market } from "./components";
import { currenciesObject } from "./components/market/CryptoCard.model";

function App() {
  const [currency, setCurrency] = useState("usd");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<"alpha" | "high" | "low" | "">("");
  const [displayMode, setDisplayMode] = useState<"card" | "table">("card");

  const toggleSort = () => {
    if (sortMode === "") setSortMode("alpha");
    else if (sortMode === "alpha") setSortMode("high");
    else if (sortMode === "high") setSortMode("low");
    else setSortMode("");
  };

  const currencies = Object.keys(currenciesObject);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortMode={sortMode}
        toggleSort={toggleSort}
        currency={currency}
        setCurrency={setCurrency}
        currencies={currencies}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
      />
      <main className="px-6 mt-32">
        <Market
          currency={currency}
          searchTerm={searchTerm}
          sortMode={sortMode}
          displayMode={displayMode}
        />
      </main>
    </div>
  );
}

export default App;
