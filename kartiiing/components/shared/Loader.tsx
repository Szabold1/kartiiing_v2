import { LoaderIcon } from 'lucide-react';

export function Loader({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center py-10">
      <LoaderIcon className="text-muted-foreground animate-spin" size={size} />
    </div>
  );
}
