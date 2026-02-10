export type Coin = {
  id: string;
  name: string;
  image: string;
  current_price: number;
};

export const currenciesObject: Record<string, string> = {
  usd: "$",
  ngn: "₦",
  eur: "€",
  gbp: "£",
  jpy: "¥",
};

export type CryptoCardProps = {
  currency: string;
  searchTerm: string;
  sortMode: "alpha" | "high" | "low" | "";
  displayMode: "card" | "table";
};
