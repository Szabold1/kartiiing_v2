import { ICountry } from "@kartiiing/shared";
import Flag from "react-world-flags";
import { cn, flagIconBase } from "@/lib/utils";

type Props = {
  name: string;
  country?: ICountry;
  showFlag?: boolean;
  className?: string;
};

export default function DriverInfo({
  name,
  country,
  showFlag = true,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showFlag && country && (
        <Flag
          code={country.code}
          alt={`${country.name} flag`}
          title={country.name}
          className={flagIconBase}
        />
      )}
      <span className="font-medium tracking-tight">{name}</span>
    </div>
  );
}
