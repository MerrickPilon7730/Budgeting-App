

import {
    Tooltip,
    XAxis,
    LineChart,
    ResponsiveContainer,
    CartesianGrid,
    Line,
} from "recharts";
import { format } from "date-fns";

import { TransactionsTooltip } from "@/components/charts/transactions-chart/transactions-tooltip";


type Props = {
    data?: {
        date: string
        income: number
        expenses: number
    }[];
}

export const LineVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<TransactionsTooltip />} />
                <Line 
                    dot={false}
                    dataKey="income"
                    stroke="#3d82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line 
                    dot={false}
                    dataKey="expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};