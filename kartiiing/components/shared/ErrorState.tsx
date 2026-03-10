type Props = {
  message: string;
  title?: string;
};

export default function ErrorState({ message, title }: Props) {
  return (
    <div className="mx-auto px-4 py-8">
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      <div className="text-center py-10">
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
