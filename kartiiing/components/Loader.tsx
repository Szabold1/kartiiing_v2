import { LoaderIcon } from "lucide-react";

export default function Loader({ size = 24 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center py-10">
      <LoaderIcon
        className={`animate-spin text-muted-foreground`}
        size={size}
      />
    </div>
  );
}
