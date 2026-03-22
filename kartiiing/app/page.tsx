import { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import { buildMetadata, getPageMetadata } from "@/lib/utils";

const pageMetadata = getPageMetadata("home");
export const metadata: Metadata = buildMetadata(pageMetadata);

export default function HomePage() {
  return <Hero subtitle={pageMetadata.description} />;
}
