import { getSweetsAction } from "@/app/actions";
import { InventoryClient } from "@/components/pages/inventory-management/InventoryClient";

export default async function InventoryPage() {
  // Fetch the initial list of all sweets on the server
  const initialSweets = await getSweetsAction();

  // Render the client component and pass the data as a prop
  return <InventoryClient initialSweets={initialSweets} />;
}