import { ISeoData } from "@kartiiing/shared-types";
import { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kartiiing.com";
// TODO: Add a default OG image to the public folder
// const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const pageMetadata: Record<string, ISeoData> = {
  home: {
    title: "Kart Racing Guide - Kartiiing",
    description:
      "Your ultimate guide to the world of kart racing. Discover championships, circuits, drivers, and everything you need to know about karting.",
    keywords:
      "karting, kart racing, go-kart racing, karting circuits, karting championships, kart races",
    openGraph: {
      url: SITE_URL,
      type: "website",
      // image: DEFAULT_OG_IMAGE,
    },
    // twitter: {
    //   image: DEFAULT_OG_IMAGE,
    // },
  },
  wiki: {
    title: "Wiki - Kartiiing",
    description:
      "Learn about kart racing, terminology, famous drivers, and everything related to the sport. The basic knowledge hub for karting enthusiasts.",
    keywords:
      "karting guide, kart racing terminology, racing drivers, karting tips, racing knowledge, kart racing history",
    openGraph: {
      url: `${SITE_URL}/wiki`,
      type: "website",
      // image: DEFAULT_OG_IMAGE,
    },
    // twitter: {
    //   image: DEFAULT_OG_IMAGE,
    // },
  },
};

/**
 * Get metadata for a specific page
 * @param pageKey - Key from the pageMetadata object
 * @param variables - Optional variables to inject into template strings
 * @returns PageMetadata object with title and description
 */
export function getPageMetadata(
  pageKey: keyof typeof pageMetadata,
  variables?: Record<string, string | number>,
): ISeoData {
  const baseMetadata = pageMetadata[pageKey];

  if (!variables) {
    return baseMetadata;
  }

  return {
    title: formatTemplate(baseMetadata.title, variables) as string,
    description: formatTemplate(baseMetadata.description, variables) as string,
    keywords: formatTemplate(baseMetadata.keywords, variables) as string,
    openGraph: baseMetadata.openGraph,
    twitter: baseMetadata.twitter,
  };
}

/**
 * Convert ISeoData to Next.js Metadata format
 * Automatically constructs OpenGraph and Twitter Card metadata
 * @param seoData - SEO data object with title, description, keywords, and optional OG/Twitter data
 * @returns Next.js Metadata object
 */
export function buildMetadata(seoData: ISeoData): Metadata {
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: seoData.openGraph?.url,
      type: seoData.openGraph?.type || "website",
      images: seoData.openGraph?.image
        ? [
            {
              url: seoData.openGraph.image,
              width: 1200,
              height: 630,
              alt: seoData.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: seoData.twitter?.image ? [seoData.twitter.image] : undefined,
    },
  };
}

// ---------------------------------------------- //
// ----- Helpers -------------------------------- //

/**
 * Format a template string or array of strings with variables
 * @param template - String or array of strings with {variableName} placeholders
 * @param variables - Object with variable values
 * @returns Formatted string or array of strings
 */
function formatTemplate(
  template: string | string[],
  variables: Record<string, string | number>,
): string | string[] {
  const replaceVariables = (str: string) =>
    str.replace(/{(\w+)}/g, (match, key) => String(variables[key] ?? match));

  return Array.isArray(template)
    ? template.map(replaceVariables)
    : replaceVariables(template);
}
