/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD") // Normalize accented characters
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Generate a race event slug in format: year-championship-circuit-id
 */
export function generateRaceEventSlug(
  year: string,
  championship: string,
  circuit: string,
  id: number
): string {
  const cleanYear = generateSlug(year);
  const cleanChampionship = generateSlug(championship);
  const cleanCircuit = generateSlug(circuit);
  return `${cleanYear}-${cleanChampionship}-${cleanCircuit}-${id}`;
}
