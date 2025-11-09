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
  heightPx?: string;
};

export default function StatusResultsBadge({
  race,
  className = "",
  heightPx = "36",
}: Props) {
  const resultLinks = race.links?.results || [];
  const status = race.status;

  const heightStyle = { height: `${heightPx}px` };
  const baseClasses = ` relative text-xs tracking-wider uppercase overflow-hidden inline-flex items-center gap-1.5 `;

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
          style={heightStyle}
        >
          Results <ExternalLink className="w-2.5 h-2.5 mr-0.5" />
        </button>
      );
    }

    return (
      <Select value="" onValueChange={(url) => openLinkInNewTab(url)}>
        <SelectTrigger
          onClick={(e) => e.stopPropagation()}
          className={`cursor-pointer rounded-none ${resultsClasses} !text-gray-600 dark:!text-gray-400 hover:!text-gray-700 hover:dark:!text-gray-300`}
          style={heightStyle}
        >
          <SelectValue placeholder="Results" />
        </SelectTrigger>
        <SelectContent className={`${grayGlassBase}`}>
          {resultLinks.map((link: IResultsLink) => (
            <SelectItem
              key={link.url}
              value={link.url}
              className="cursor-pointer transition"
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
      style={heightStyle}
    >
      {status}
    </span>
  );
}
