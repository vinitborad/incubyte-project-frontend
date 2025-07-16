"use server" // This directive marks all functions in this file as Server Actions

import { fetchSweets } from "@/lib/api";

export const getSweetsAction = async () => {
  const sweets = await fetchSweets();
  return sweets;
};