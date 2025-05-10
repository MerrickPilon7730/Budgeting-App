/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

import { ImportTable } from "./import-table";

import { useState } from "react";
import { convertAmountToMiliunits } from "@/lib/utils";
import { format, parse } from "date-fns";

// Formatting the input and output of the date (according to my db schema)
const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

// The columns that are required to add transactions from a CSV
const requiredOptions = ["date", "amount", "payee"];

// Maps the columns from CSV file to either a string (required fields) or null (skip field)
interface SelectedColumnsState {
    [key: string]: string | null;
}

// Props for the ImportCard component
type Props = {
    data: string[][];
    oncancel: () => void
    onsubmit: (data: any) => void
};


export const ImportCard = ({
    data,
    oncancel,
    onsubmit,
}: Props) => {
    // State for the selected columns
    const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({});

    // Splitting the data into headers and body, headers being the first row and the data being the rest
    const headers = data[0];
    const body = data.slice(1);

    // Function to handle changes in the selected columns (select/deselect which column is required)
    const onTableHeadSelectChange = (
        columnIndex: number, 
        value: string | null
    ) => {
        setSelectedColumns((prev) => {
            const newSlectedColumns = {...prev};

            for (const key in newSlectedColumns) {
                if(newSlectedColumns[key] === value) {
                    newSlectedColumns[key] = null;
                }
            }

            if(value === "skip") {
                value = null;
            } 

            newSlectedColumns[`column_${columnIndex}`] = value;

            return newSlectedColumns;
        });
    };

    // Counting the number of selected columns that are required (ensure all required columns are selected before importing)
    const progress = Object.values(selectedColumns).filter(Boolean).length;

    // Function to handle the continue button
    const handleContinue = () => {
        // Function to get the column index
        const getColumnIndex = (column: string) => {
            return column.split("_")[1];
        };

        // Build new headers array based on selected columns
        const mappedData = {
            headers: headers.map((_header, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);

                return selectedColumns[`column_${columnIndex}`] || null;
            }),
            // Filter out rows where all selected columns are null
            body: body.map((row) => {
                const transformRow = row.map((cell, index) => {
                    const columnIndex = getColumnIndex(`column_${index}`);

                    return selectedColumns[`column_${columnIndex}`] ? cell : null;
                });


                return transformRow.every((item) => item === null) ? [] : transformRow;
            }).filter((row) => row.length > 0),
        };

         // Turn each row into a key-value object with field names
        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, index) => { 
                const header = mappedData.headers[index];

                if (header !== null) {
                    acc[header] = cell;
                }

                return acc;
            }, {});
        });

        // Final formatting of date and amount fields
        const formattedData = arrayOfData.map((item) => ({
            ...item,
            amount: convertAmountToMiliunits(parseFloat(item.amount)),
            date: format(parse(item.date, dateFormat, new Date()), outputFormat),
        }));

        onsubmit(formattedData);
    };


    return(
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transaction
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                        <Button 
                            onClick={oncancel} 
                            size="sm"
                            className="w-full lg:w-auto"
                            >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleContinue}
                            disabled={progress < requiredOptions.length}
                            size="sm"
                            className="w-full lg:w-auto"
                            >
                                Continue ({progress}/{requiredOptions.length})
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeadSelectChange={onTableHeadSelectChange}
                    />
                </CardContent>
            </Card>
        </div>
    );
};