"use client";

import { Suspense } from "react";
import TransactionsPageContent from "./transaction-page-content";

export default function TransactionsPage() {
  return (
    <Suspense fallback={<div>Loading transactions...</div>}>
      <TransactionsPageContent />
    </Suspense>
  );
}
