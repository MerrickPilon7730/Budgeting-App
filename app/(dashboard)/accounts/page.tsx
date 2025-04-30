"use client";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
} from "@/components/ui/card"

import { Plus } from "lucide-react";

import { 
    columns, 
    Payment, 
} from "./columns";


const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "10160",
      amount: 200,
      status: "success",
      email: "a@example.com",
    }
  ]

const AccountsPage = () => {

    const  newAccount  = useNewAccount();

    return (
        <div className="max-w-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        AccountsPage
                    </CardTitle>

                    <Button onClick={newAccount.onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>

                <CardContent className="">
                    <DataTable columns={columns} data={data} />
                </CardContent>
                
            </Card>
            
        </div>
    );
};

export default AccountsPage