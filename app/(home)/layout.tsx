"use client";

import { Chatbot } from "@/components/Chatbot";
import QueryProvider from "@/stores/queryProvider";

export default function NewOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <>
        {children}
        <Chatbot />
      </>
    </QueryProvider>
  );
}
