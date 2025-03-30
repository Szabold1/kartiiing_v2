interface Props {
  value: string;
}

const TextParagraph = ({ value }: Props) => {
  return <p className="mt-3 leading-7">{value}</p>;
};

export default TextParagraph;
