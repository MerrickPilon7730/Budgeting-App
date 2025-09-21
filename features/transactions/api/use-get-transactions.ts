
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertMiliunitsToAmount } from "@/lib/utils";

export const useGetTransactions = (from: string, to: string, accountId: string) => {
  return useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: { from, to, accountId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const { data } = await response.json();
      return data.map((transaction) => ({
        ...transaction,
        amount: convertMiliunitsToAmount(transaction.amount),
      }));
    },
  });
};
