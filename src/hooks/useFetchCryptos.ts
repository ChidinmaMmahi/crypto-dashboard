const coinIds: string[] = [
  "bitcoin",
  "ethereum",
  "cardano",
  "solana",
  "dogecoin",
  "binancecoin",
];

export const fetchCryptos = async (currency: string) => {
  const ids = coinIds.join(",");
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}`
    );
    if (!res.ok) throw new Error("Failed to fetch crypto data");
    return res.json();
  } catch {
    throw new Error("Network Error: Couldn't fetch crypto data");
  }
};

export const fetchCoinDetail = async (id: string) => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (!res.ok) throw new Error("Failed to fetch crypto data");
    return res.json();
  } catch {
    throw new Error("Network Error: Couldn't fetch coin details");
  }
};
