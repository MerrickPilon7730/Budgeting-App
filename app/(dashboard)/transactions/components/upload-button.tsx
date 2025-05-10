/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

// Props for the UploadButton component
type Props = {
    onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
    // Get the CSVReader component
    const { CSVReader } = useCSVReader();

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({getRootProps}: any) => (
                <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
                    <Upload className="mr-2 size-4" />
                        Import
                </Button>
            )}
        </CSVReader>
    );
};