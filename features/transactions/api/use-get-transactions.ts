
import {useQuery} from '@tanstack/react-query';
import {client} from '@/lib/hono';
import { useSearchParams } from 'next/navigation';
import { convertMiliunitsToAmount } from '@/lib/utils';


export const useGetTransactions = () => {
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const accountId = searchParams.get("account_id") || "";

    const query = useQuery({
        //TODO: check if params are needed in the key
        queryKey: ["transactions", {from, to, accountId}],
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query: {
                    from,
                    to,
                    accountId,
                }
            });
            
            if(!response.ok){ {
                throw new Error("Failed to fetch transactions");
            }}

            const {data} = await response.json();
            return data.map((transaction) => ({
                ...transaction,
                amount: convertMiliunitsToAmount(transaction.amount),
            }));
        },
    })

    return query;
}