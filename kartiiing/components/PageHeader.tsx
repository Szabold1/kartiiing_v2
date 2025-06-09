type Props = {
  title: string;
  description?: string;
};

const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="space-y-2 my-10">
      <h1 className="text-4xl font-bold">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export default PageHeader;
