import { CryptoCard } from "./crypto-card/CryptoCard";

type MarketProps = {
  currency: string;
  searchTerm: string;
  sortMode: "alpha" | "high" | "low" | "";
  displayMode: "card" | "table";
};

export const Market = ({
  currency,
  searchTerm,
  sortMode,
  displayMode,
}: MarketProps) => {
  return (
    <CryptoCard
      currency={currency}
      searchTerm={searchTerm}
      sortMode={sortMode}
      displayMode={displayMode}
    />
  );
};
