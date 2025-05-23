"use client";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
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
} from "./category-columns";



const CategoriesPage = () => {
    // Hook to open new category form
    const newCategory = useNewCategory();
    // Hook to bulk delete categories
    const deleteCategories = useBulkDeleteCategories();
    // Hook to fetch all categories
    const categoryQuery = useGetCategories();
    const categories = categoryQuery.data || [];

    // disable button if categories are loading or are being deleted
    const isDisabled =
    categoryQuery.isLoading || deleteCategories.isPending;

    // render skeleton if categories are loading
    if(categoryQuery.isLoading) {
        return (
            <div className="max-w-2xl mx-auto w-full pb-10 -mt-24">
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
 
    // render categories when loaded
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories Page
                    </CardTitle>

                    <Button onClick={newCategory.onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>

                <CardContent>
                    <DataTable columns={columns} data={categories} filterKey="name" onDelete={(row) => {const ids = row.map((row) => row.original.id); deleteCategories.mutate({ids});}} disabled={isDisabled}/>
                </CardContent>
                
            </Card>  
        </div>
    );
};

export default CategoriesPage