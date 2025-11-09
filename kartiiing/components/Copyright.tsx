"use client";

interface Props {
  year?: number;
  text?: string;
  links?: Array<{
    label: string;
    url: string;
  }>;
  className?: string;
}

export default function Copyright({
  year = 2022,
  text = "FIA Karting World Championship",
  links = [
    { label: "FIA Karting", url: "https://www.fiakarting.com" },
    { label: "KSP", url: "https://kspreportages.com/?lang=en" },
  ],
  className = "",
}: Props) {
  return (
    <div className={`text-center text-xs text-gray-300/80 ${className}`}>
      <p>
        {year} {text} (Photo © {year}{" "}
        {links.map((link, index) => (
          <span key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-100 transition-colors"
            >
              {link.label}
            </a>
            {index < links.length - 1 && " / "}
          </span>
        ))}
        )
      </p>
    </div>
  );
}
