import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchCryptos } from "../../hooks/useFetchCryptos";
import { useState } from "react";
import { Link } from "react-router-dom";

type Coin = {
  id: string;
  name: string;
  image: string;
  current_price: number;
};

const currenciesObject: Record<string, string> = {
  usd: "$",
  ngn: "₦",
  eur: "€",
  gbp: "£",
  jpy: "¥",
};
const currencies = Object.keys(currenciesObject);

export const CryptoCard = () => {
  const [currency, setCurrency] = useState("usd");

  const { data, isLoading, error } = useQuery({
    queryKey: ["crypto-prices", currency],
    queryFn: () => fetchCryptos(currency),
    refetchInterval: 600000,
    staleTime: 300000,
  });

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-end mb-5">
          <div className="py-3 px-4 rounded-sm shadow bg-white dark:bg-gray-800 animate-pulse">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow bg-white dark:bg-gray-800 animate-pulse"
            >
              <div className="flex gap-x-2 items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center text-red-600 pt-20">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-5">
        <div className="bg-green-600 text-white py-2.5 px-4 rounded-sm cursor-pointer ">
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border-none outline-none cursor-pointer"
          >
            {currencies.map((currency) => (
              <option value={currency} key={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((coin: Coin) => (
          <Link to={`/coin/${coin.id}`} key={coin.id}>
            <motion.div
              className="p-6 rounded-xl shadow bg-white dark:bg-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex gap-x-1">
                <img
                  src={coin.image}
                  alt={`${coin.name} logo`}
                  className="w-8 h-8 mb-2"
                />
                <h2 className="text-xl font-bold">{coin.name}</h2>
              </div>

              <p className="mt-2 text-lg">
                Price: &nbsp;
                <span className="font-semibold text-green-500">
                  {currenciesObject[currency]}
                  {coin.current_price.toLocaleString()}
                </span>
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
