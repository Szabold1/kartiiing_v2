import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  headerAction?: React.ReactNode;
  actionLayout?: "horizontal" | "vertical";
};

const PageHeader = ({
  title,
  description,
  headerAction,
  actionLayout = "horizontal",
}: Props) => {
  const isVertical = actionLayout === "vertical";

  return (
    <header className="space-y-2 my-10 sm:mt-[2.7rem] sm:mb-[3rem]">
      <div className={cn("flex gap-4", isVertical && "flex-col")}>
        <h1 className="text-4xl font-bold">{title}</h1>
        {headerAction}
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </header>
  );
};

export default PageHeader;
