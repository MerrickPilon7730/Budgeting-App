"use client";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
} from "@/components/ui/card"

import { columns } from "./components/transaction-columns";
import { UploadButton } from "./components/upload-button";
import { ImportCard } from "./components/import-card";

import { useState } from "react";
import { Loader2, Plus, } from "lucide-react";
import { transactions as transactionSchema } from "@/db/schema";
import { toast } from "sonner";

// Enum for the variants of the page
enum VARIANTS {
    LIST = "LIST",
    "IMPORT" = "IMPORT",
}

// Initial state for the import results
const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
};

const TransactionsPage = () => {
    // Hook to select account (dialog and confirmation handler)
    const [AccountDialog, confirm] = useSelectAccount();
    // State for the variant of the page
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    // State for the import results (CSV)
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    // Callback for the upload button
    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    };

    // Callback for the cancel button
    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    };

    // Hooks for transactions (CRUD and query)
    const newTransaction = useNewTransaction();
    const createTransactions = useBulkCreateTransactions();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    // Disable the data table if there are loading queries or pending deletions
    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

    // Submit parsed CSV data as new transactions
    const onSubitImport = async (
        values: typeof transactionSchema.$inferInsert[],
    ) => {
        const accountId = await confirm();

        if (!accountId){
            return toast.error('Please select an account to continue');
        }

        const data = values.map((value) => ({
            ...value,
            accountId: accountId as string,
        }));

        createTransactions.mutate(data, {
            onSuccess: () => {
                onCancelImport()
            }
        });

    };

    // Show loading skeleton while data is being fetched
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
 
    // If variant is IMPORT, show the import UI
    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <AccountDialog />
                <ImportCard 
                data={importResults.data} 
                oncancel={onCancelImport} 
                onsubmit={onSubitImport}
                />
            </>
        )
    }

    // If variant is LIST, show the parsed transactions from the CSV
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transaction History
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gay-y-2 items-center gap-x-2">
                        <Button 
                            onClick={newTransaction.onOpen} 
                            size="sm"
                            className="w-full lg:w-auto"
                        >
                            <Plus className="size-4 mr-2" />
                            Add New
                        </Button>
                        <UploadButton 
                            onUpload={onUpload}
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={columns} 
                        data={transactions} 
                        filterKey="payee" 
                        onDelete={(row) => {const ids = row.map((row) => row.original.id); deleteTransactions.mutate({ids});}} 
                        disabled={isDisabled}/>
                </CardContent>
                
            </Card>  
        </div>
    );
};

export default TransactionsPage;