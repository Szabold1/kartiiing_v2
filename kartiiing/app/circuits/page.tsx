import PageHeader from "@/components/shared/PageHeader";
import PageWrapper from "@/components/shared/PageWrapper";
import { CircuitsClient } from "./circuits-client";
import {
  getCircuits,
  getCircuitsMetadata,
  getCircuitCoordinates,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CircuitsPage() {
  const initialData = await getCircuits({ page: 1, limit: 20 });
  const coordinates = await getCircuitCoordinates();

  let description = `Explore our database of ${initialData.meta.totalItems} karting circuits.`;

  try {
    const metadata = await getCircuitsMetadata();
    description = metadata.description;
  } catch (error) {
    console.error("Error fetching circuits metadata:", error);
  }

  return (
    <PageWrapper>
      <PageHeader title="Circuits" description={description} />
      <CircuitsClient initialData={initialData} coordinates={coordinates} />
    </PageWrapper>
  );
}
