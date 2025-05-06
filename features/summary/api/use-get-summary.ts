
import {useQuery} from '@tanstack/react-query';
import {client} from '@/lib/hono';
import { useSearchParams } from 'next/navigation';
import { convertMiliunitsToAmount } from '@/lib/utils';


export const useGetSummary = () => {
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const accountId = searchParams.get("account_id") || "";

    const query = useQuery({
        //TODO: check if params are needed in the key
        queryKey: ["summary", {from, to, accountId}],
        queryFn: async () => {
            const response = await client.api.summary.$get({
                query: {
                    from,
                    to,
                    accountId,
                }
            });
            
            if(!response.ok){ {
                throw new Error("Failed to fetch summary");
            }}

            const {data} = await response.json();
            return {
                ...data,
                incomeAmount: convertMiliunitsToAmount(data.incomeAmount),
                expensesAmount: convertMiliunitsToAmount(data.expensesAmount),
                remainingAmount: convertMiliunitsToAmount(data.remainingAmount),
                categories: data.categories.map((category) => ({
                    ...category,
                    value: convertMiliunitsToAmount(category.value),
                })),
                days: data.days.map((day) => ({
                    ...day,
                    income: convertMiliunitsToAmount(day.income),
                    expenses: convertMiliunitsToAmount(day.expenses),
                })),
            };
        },
    })

    return query;
}