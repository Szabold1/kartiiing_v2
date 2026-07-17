type Props = {
  message: string;
  title?: string;
};

export function ErrorState({ message, title }: Props) {
  return (
    <div className="mx-auto px-4 py-8">
      {title && <h1 className="text-center text-2xl font-bold">{title}</h1>}
      <div className="mt-4 text-center">
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
