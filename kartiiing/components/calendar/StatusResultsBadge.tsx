import {
  grayGlassBase,
  redGlassBase,
  grayGlassHover,
  emeraldGlassBase,
} from "@/lib/classNames";
import { IRaceEvent, RaceStatus, IResultsLink } from "@kartiiing/shared-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { openLinkInNewTab } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useMemo } from "react";

type Props = {
  race: IRaceEvent;
  className?: string;
  heightValue?: string;
};

export default function StatusResultsBadge({
  race,
  className = "",
  heightValue = "10",
}: Props) {
  const resultLinks = race.links?.results || [];
  const status = race.status;

  const calculatedHeight = useMemo(
    () => `${parseFloat(heightValue) * 0.25}rem`,
    [heightValue],
  );

  const baseClasses = `relative text-xs tracking-wider uppercase overflow-hidden inline-flex items-center gap-1.5 font-medium`;

  // If results are available, show results link instead of status
  if (resultLinks.length > 0) {
    const resultsClasses = `${baseClasses} ${grayGlassHover} cursor-pointer ${className} `;

    if (resultLinks.length === 1) {
      return (
        <a
          href={resultLinks[0].url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`${resultsClasses}`}
          style={{ height: calculatedHeight }}
          title="View results"
        >
          Results <ExternalLink className="w-3 h-3 mx-0.5" />
        </a>
      );
    }

    return (
      <Select value="" onValueChange={(url) => openLinkInNewTab(url)}>
        <SelectTrigger
          onClick={(e) => e.stopPropagation()}
          className={`cursor-pointer rounded-none ${resultsClasses} !text-gray-600 dark:!text-gray-400 transition`}
          style={{ height: calculatedHeight }}
        >
          <SelectValue placeholder="Results" />
        </SelectTrigger>
        <SelectContent
          className={`${grayGlassBase}`}
          onClick={(e) => e.stopPropagation()}
        >
          {resultLinks.map((link: IResultsLink) => (
            <SelectItem
              key={link.url}
              value={link.url}
              className="cursor-pointer transition h-10"
            >
              {link.category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // Otherwise show status badge
  if (!status) return null;

  const colorClasses = {
    [RaceStatus.LIVE]: `${redGlassBase} `,
    [RaceStatus.UPNEXT]: `${redGlassBase} `,
    [RaceStatus.UPCOMING]: `${emeraldGlassBase} `,
    [RaceStatus.FINISHED]: `${grayGlassBase} `,
  };

  return (
    <span
      className={`${baseClasses} ${colorClasses[status]} ${className}`}
      style={{ height: calculatedHeight }}
    >
      {status}
    </span>
  );
}
