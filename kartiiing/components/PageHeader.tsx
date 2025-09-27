type Props = {
  title: string;
  description?: string;
  headerAction?: React.ReactNode;
};

const PageHeader = ({ title, description, headerAction }: Props) => {
  return (
    <div className="space-y-2 my-10">
      <div className="flex items-end gap-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {headerAction}
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export default PageHeader;
