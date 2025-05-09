"use client";

import { MoreHorizontal, Edit, Trash } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

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
    // Confirmation dialog for deleting a category
    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Category",
        "Are you sure you want to delete this category? This action cannot be undone."
    );
    // Mutations for deleting a category
    const deleteMutation = useDeleteCategory(id);
    // Hook for opening the edit category sheet
    const { onOpen } = useOpenCategory();

    // Function for deleting a category
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