import { TriangleAlert } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";

import { cn } from "@/lib/utils";

// Props for the CategoryColumn component
type Props = {
    id: string;
    category: string | null;
    categoryId: string | null;
};

export const CategoryColumn = ({
    id,
    category,
    categoryId,
}: Props) => {
    // Hooks for opening categories and transactions edit view
    const { onOpen: onOpenCategory } = useOpenCategory();
    const { onOpen: onOpenTransaction } = useOpenTransaction();

    // Click handler opens the category edit view if category exists, else opens the transaction edit view
    const onClick = () => {
        if (categoryId) {
            onOpenCategory(categoryId);
        } else {
            onOpenTransaction(id);
        }
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center cursor-pointer hover:underline",
                !category && "text-rose-500"
            )}
        >
             {/* Show alert icon if category is missing */}
            {!category && <TriangleAlert className="mr-2 size-4 shrink-0"/>}
            {category || "Uncategorized"}
        </div>
    );
};