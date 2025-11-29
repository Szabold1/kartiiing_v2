import { grayGlassBase, redGlassBase, grayGlassHover } from "@/lib/classNames";
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

  const baseClasses = ` relative text-xs tracking-wider uppercase overflow-hidden inline-flex items-center gap-1.5 h-${heightValue} `;

  // If results are available, show results button instead of status
  if (resultLinks.length > 0) {
    const resultsClasses = `${baseClasses} ${grayGlassHover} cursor-pointer ${className} `;

    if (resultLinks.length === 1) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            openLinkInNewTab(resultLinks[0].url);
          }}
          className={`${resultsClasses}`}
        >
          Results <ExternalLink className="w-3 h-3 mx-0.5" />
        </button>
      );
    }

    return (
      <Select value="" onValueChange={(url) => openLinkInNewTab(url)}>
        <SelectTrigger
          onClick={(e) => e.stopPropagation()}
          className={`cursor-pointer rounded-none ${resultsClasses} !text-gray-600 dark:!text-gray-400 hover:!text-gray-700 hover:dark:!text-gray-300`}
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
    [RaceStatus.FINISHED]: `${grayGlassBase} `,
  };

  return (
    <span
      className={`${baseClasses} ${colorClasses[status]} ${className}`}
    >
      {status}
    </span>
  );
}
