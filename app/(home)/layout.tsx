"use client";

import QueryProvider from "@/stores/queryProvider";

export default function NewOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
