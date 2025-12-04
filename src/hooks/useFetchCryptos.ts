export const fetchCryptos = async ({
  pageParam = 1,
  currency,
}: {
  pageParam?: number;
  currency: string;
}) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=${pageParam}`
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
