import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetail } from "../../hooks";
import { Loader } from "../../shared";

type CoinDetailProps = {
  id?: string;
};

export const CoinDetail = ({ id }: CoinDetailProps) => {
  const params = useParams();
  const coinId = id || params.id; // use prop first, fallback to route param

  const { data, isLoading, error } = useQuery({
    queryKey: ["coin-detail", coinId],
    queryFn: () => fetchCoinDetail(coinId!),
    enabled: !!coinId,
    staleTime: 30000,
  });

  if (isLoading) return <Loader />;

  if (error || !data)
    return (
      <p className="text-center text-red-600 pt-4">
        Error fetching coin details.
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
