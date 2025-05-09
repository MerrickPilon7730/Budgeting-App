"use client";

import { MoreHorizontal, Edit, Trash } from "lucide-react";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

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

// Component for account actions (edit/delete)
export const Actions = ({ id }: Props) => {
    // Confirmation dialog for deleting an account
    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Account",
        "Are you sure you want to delete this account? This action cannot be undone."
    );

    // Mutations for deleting an account
    const deleteMutation = useDeleteAccount(id);
    // Function for opening the edit account sheet
    const { onOpen } = useOpenAccount();

    // Function for deleting an account
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