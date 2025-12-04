import { useState } from "react";
import { CryptoCard } from "./crypto-card/CryptoCard";
import { CryptoControls } from "./CryptoControls";
import { currenciesObject } from "./CryptoCard.model";

export const Market = () => {
  const [currency, setCurrency] = useState("usd");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<"alpha" | "high" | "low" | "">("");

  const toggleSort = () => {
    if (sortMode === "") setSortMode("alpha");
    else if (sortMode === "alpha") setSortMode("high");
    else if (sortMode === "high") setSortMode("low");
    else setSortMode("");
  };

  const currencies = Object.keys(currenciesObject);

  return (
    <div>
      {/* Always visible controls */}
      <CryptoControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortMode={sortMode}
        toggleSort={toggleSort}
        currency={currency}
        setCurrency={setCurrency}
        currencies={currencies}
      />

      {/* Data display */}
      <CryptoCard
        currency={currency}
        searchTerm={searchTerm}
        sortMode={sortMode}
      />
    </div>
  );
};
