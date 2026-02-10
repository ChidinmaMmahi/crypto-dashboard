import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchCryptos } from "../../../hooks/useFetchCryptos";
import { useState, useMemo, useEffect } from "react";
import { Card, Modal, Skeleton } from "antd";
import { CoinDetail } from "../CoinDetails";
import { CryptoCardLayout } from "./CryptoCardLayout";
import { Loader } from "../../../shared/Loader";
import {
  type Coin,
  type CryptoCardProps,
  currenciesObject,
} from "../CryptoCard.model";

export const CryptoCard = ({
  currency,
  searchTerm,
  sortMode,
  displayMode,
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
    refetch,
  } = useInfiniteQuery({
    queryKey: ["crypto-prices"],
    queryFn: ({ pageParam = 1 }) => fetchCryptos({ pageParam, currency }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 250 ? allPages.length + 1 : undefined,
    staleTime: 300000,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  // Refetch data when currency changes
  useEffect(() => {
    refetch();
  }, [currency, refetch]);

  // Auto-load when searching
  useEffect(() => {
    if (searchTerm && hasNextPage) {
      fetchNextPage();
    }
  }, [searchTerm, hasNextPage, fetchNextPage]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px", // Trigger when 100px from bottom
      }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    <div className="pb-1 pt-12 sm:pt-0">
      {displayMode === "card" ? (
        <CryptoCardLayout>
          {filteredCoins.map((coin) => (
            <motion.div
              key={coin.id}
              className="p-6 rounded-xl shadow bg-white cursor-pointer"
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
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[320px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coin
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCoins.map((coin) => (
                <motion.tr
                  key={coin.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => showModal(coin.id)}
                >
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap min-w-0">
                    <div className="flex items-center">
                      <img
                        src={coin.image}
                        alt={`${coin.name} logo`}
                        className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                        {coin.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    <span className="font-medium text-green-500">
                      {currenciesObject[currency]}
                      {coin.current_price.toLocaleString()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

      {/* Infinite Scroll Sentinel */}
      {hasNextPage && (
        <div id="scroll-sentinel" className="flex justify-center my-6">
          {isFetchingNextPage && <Loader />}
        </div>
      )}
    </div>
  );
};
