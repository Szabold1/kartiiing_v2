import { PageHeader } from "@/components/shared/PageHeader";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { CircuitsClient } from "./circuits-client";
import {
  getCircuits,
  getCircuitsMetadata,
  getCircuitCoordinates,
} from "@/lib/api";
import { emptyPaginatedResponse } from "@kartiiing/shared";
import type { ICircuit, ICircuitCoordinate } from "@kartiiing/shared";
import { SITE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

/**
 * Generate metadata for the circuits page
 */
export async function generateMetadata() {
  try {
    const metadata = await getCircuitsMetadata();

    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      openGraph: {
        url: `${SITE_URL}/circuits`,
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error generating circuits metadata:", error);

    return {
      title: "Circuits - Kartiiing",
      description: "Explore our database of karting circuits.",
      keywords: "karting circuits, go kart tracks, racing circuits",
      openGraph: {
        url: `${SITE_URL}/circuits`,
        type: "website",
      },
    };
  }
}

export default async function CircuitsPage() {
  let initialData: Awaited<ReturnType<typeof getCircuits>>;
  let coordinates: ICircuitCoordinate[];
  let serverError: string | undefined;

  try {
    initialData = await getCircuits({ page: 1, limit: 20 });
  } catch (error) {
    console.error("Error fetching circuits:", error);
    initialData = emptyPaginatedResponse<ICircuit>(1, 20);
    serverError =
      "Failed to load circuits. Check your internet connection and try again.";
  }

  try {
    coordinates = await getCircuitCoordinates();
  } catch (error) {
    console.error("Error fetching circuit coordinates:", error);
    coordinates = [];
  }

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
      <CircuitsClient
        initialData={initialData}
        coordinates={coordinates}
        serverError={serverError}
      />
    </PageWrapper>
  );
}
