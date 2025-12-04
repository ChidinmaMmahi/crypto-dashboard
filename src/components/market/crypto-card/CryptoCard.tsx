import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchCryptos } from "../../../hooks/useFetchCryptos";
import { useState, useMemo, useEffect } from "react";
import { Card, Modal, Skeleton } from "antd";
import { CoinDetail } from "../CoinDetails";
import { CryptoCardLayout } from "./CryptoCardLayout";
import {
  type Coin,
  type CryptoCardProps,
  currenciesObject,
} from "../CryptoCard.model";

export const CryptoCard = ({
  currency,
  searchTerm,
  sortMode,
}: CryptoCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);

  const showModal = (id: string) => {
    setSelectedCoinId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCoinId(null);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["crypto-prices", currency],
    queryFn: ({ pageParam = 1 }) => fetchCryptos({ pageParam, currency }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 250 ? allPages.length + 1 : undefined,
    staleTime: 300000,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  // Auto-load when searching
  useEffect(() => {
    if (searchTerm && hasNextPage) {
      fetchNextPage();
    }
  }, [searchTerm, hasNextPage, fetchNextPage]);

  // Filter + sort
  const filteredCoins = useMemo(() => {
    const coins: Coin[] = data?.pages.flat() ?? [];
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortMode) {
      case "alpha":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "high":
        filtered.sort((a, b) => b.current_price - a.current_price);
        break;
      case "low":
        filtered.sort((a, b) => a.current_price - b.current_price);
        break;
    }

    return filtered;
  }, [data, searchTerm, sortMode]);

  // 🦴 Skeleton loader (responsive)
  if (isLoading) {
    return (
      <CryptoCardLayout>
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} className="rounded-full shadow-sm">
            <Skeleton
              avatar
              title={{ width: "60%" }}
              paragraph={{ rows: 1 }}
              active
            />
          </Card>
        ))}
      </CryptoCardLayout>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex justify-center text-red-600 pt-20">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="pb-1">
      <CryptoCardLayout>
        {filteredCoins.map((coin) => (
          <motion.div
            key={coin.id}
            className="p-6 rounded-xl shadow bg-white dark:bg-gray-800 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => showModal(coin.id)}
          >
            <div className="flex gap-x-1 items-center">
              <img
                src={coin.image}
                alt={`${coin.name} logo`}
                className="w-8 h-8 mb-2"
              />
              <h2 className="text-xl font-bold">{coin.name}</h2>
            </div>

            <p className="mt-2 text-lg">
              Price:&nbsp;
              <span className="font-medium text-green-500">
                {currenciesObject[currency]}
                {coin.current_price.toLocaleString()}
              </span>
            </p>
          </motion.div>
        ))}
      </CryptoCardLayout>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        {selectedCoinId && <CoinDetail id={selectedCoinId} />}
      </Modal>

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-60"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};
