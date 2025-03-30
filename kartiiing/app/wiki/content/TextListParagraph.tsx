interface Props {
  value: string[];
}

const TextListParagraph = ({ value }: Props) => {
  const borderStyle = "border-dashed border-gray-500";

  return (
    <ul className="mt-4">
      {value.map((item, index) => {
        const [title, ...descriptionParts] = item.split(" – ");
        const description = descriptionParts.join(" – ");

        return (
          <li className={`mt-4.5 border-l ${borderStyle}`} key={index}>
            <p className={`px-2 mb-0.5 pb-0.5 font-medium inline-block border-b ${borderStyle}`}>
              {title}
            </p>
            <p className="pl-2">{description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default TextListParagraph;
