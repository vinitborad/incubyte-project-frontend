import { HomeClient } from "@/components/pages/home/HomeClient";
import { getSweetsAction } from "../actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Fetch the initial data on the server
  const initialSweets = await getSweetsAction();

  // 2. Render a client component and pass the data to it
  return <HomeClient initialSweets={initialSweets} />;
}