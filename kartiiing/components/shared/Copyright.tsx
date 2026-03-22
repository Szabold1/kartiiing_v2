"use client";

import { openLinkInNewTab } from "@/lib/utils";

interface Props {
  year?: number;
  text?: string;
  links?: Array<{
    label: string;
    url: string;
  }>;
  className?: string;
  ariaHidden?: boolean;
}

export default function Copyright({
  year = 2022,
  text = "FIA Karting World Championship",
  links = [
    { label: "FIA Karting", url: "https://www.fiakarting.com" },
    { label: "KSP", url: "https://kspreportages.com/?lang=en" },
  ],
  className = "",
  ariaHidden = false,
}: Props) {
  return (
    <div
      className={`text-center text-xs text-gray-300/80 ${className}`}
      aria-hidden={ariaHidden}
    >
      <p>
        {year} {text} (Photo © {year}{" "}
        {links.map((link, index) => (
          <span key={link.label}>
            <span
              className="hover:text-gray-100 hover:underline transition-colors cursor-pointer"
              onClick={() => openLinkInNewTab(link.url)}
            >
              {link.label}
            </span>
            {index < links.length - 1 && " / "}
          </span>
        ))}
        )
      </p>
    </div>
  );
}
