"use client";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
} from "@/components/ui/card"

import { Loader2, Plus } from "lucide-react";

import { 
    columns, 
    //Payment, 
} from "./transaction-columns";



const TransactionsPage = () => {
    const newTransaction = useNewTransaction();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled =
        transactionsQuery.isLoading || deleteTransactions.isPending;

    if(transactionsQuery.isLoading) {
        return (
            <div className="max-w-2x1 mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flec items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>  
            </div>
        );
    }
 
    return (
        <div className="max-w-4xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transaction History
                    </CardTitle>

                    <Button onClick={newTransaction.onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>

                <CardContent>
                    <DataTable columns={columns} data={transactions} filterKey="name" onDelete={(row) => {const ids = row.map((row) => row.original.id); deleteTransactions.mutate({ids});}} disabled={isDisabled}/>
                </CardContent>
                
            </Card>  
        </div>
    );
};

export default TransactionsPage;