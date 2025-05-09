"use client";

import { MoreHorizontal, Edit, Trash } from "lucide-react";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";

import { useConfirm } from "@/hooks/use-confirm";

// Props for the Actions component
type Props = {
    id: string;
};

export const Actions = ({ id }: Props) => {
    // Confirmation dialog for deleting a transaction
    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Transaction",
        "Are you sure you want to delete this transaction? This action cannot be undone."
    );
    // Mutations for deleting a transaction
    const deleteMutation = useDeleteTransaction(id);
    // Hook for opening the edit transaction sheet
    const { onOpen } = useOpenTransaction();

    // Function for deleting a transaction
    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        }
    }

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
                        <Edit className="mr-2 size-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
                        <Trash className="mr-2 size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};