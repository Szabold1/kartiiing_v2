type Props = {
  value: string;
}

export function TextParagraph({ value }: Props) {
  return <p className="mt-3 leading-7">{value}</p>;
}
