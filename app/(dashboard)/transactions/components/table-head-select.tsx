import { cn } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Props for the TableHeadSelect component
type Props = {
    columnIndex: number;
    selectedColumns: Record<string, string | null>;
    onChange: (
        columnIndex: number,
        value: string | null,
    ) => void;
};

// Options for the select component
const options =[
    "amount",
    "date",
    "payee",
];

// 
export const TableHeadSelect = ({
    columnIndex,
    selectedColumns,
    onChange,
}: Props) => {
    // Get the current selection for column
    const currentSelection = selectedColumns[`column_${columnIndex}`] || null;

    return (
        <Select
            value={currentSelection || ""}
            onValueChange={(value) => onChange(columnIndex, value)}
        >
            <SelectTrigger
                className={cn(
                    "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
                    currentSelection && "text-blue-500",
                )}
            >
                <SelectValue placeholder="Skip" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="skip">Skip</SelectItem>
                {options.map((option, index) => {
                    const disabled = Object.values(selectedColumns).includes(option) && selectedColumns[`column_${columnIndex}`] !== option;

                    return (
                        <SelectItem key={index} value={option} disabled={disabled} className="capitalize">
                            {option}
                        </SelectItem>
                )})}
            </SelectContent>
        </Select>
    );
};
