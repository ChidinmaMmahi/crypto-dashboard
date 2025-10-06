import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetail } from "../../hooks";
import { Loader } from "../../shared";

export const CoinDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["coin-detail", id],
    queryFn: () => fetchCoinDetail(id!),
    refetchInterval: false,
    staleTime: 30000,
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className="text-center text-red-600 pt-20">
        Error fetching {data.name} detail
      </p>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
      <img src={data.image.large} alt={data.name} className="w-16 mb-4" />
      <p
        dangerouslySetInnerHTML={{
          __html: data.description.en.split(".")[0] + ".",
        }}
      ></p>
      <p className="mt-4 text-xl">
        Current Price:{" "}
        <span className="text-green-500 font-medium">
          ${data.market_data.current_price.usd.toLocaleString()}
        </span>
      </p>
    </div>
  );
};
