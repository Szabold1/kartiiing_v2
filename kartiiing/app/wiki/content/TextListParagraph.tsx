import { cn } from '@/lib/utils';

type Props = {
  value: string[];
};

export function TextListParagraph({ value }: Props) {
  const borderStyle = 'border-dashed border-gray-500';

  return (
    <ul className="mt-4">
      {value.map((item, index) => {
        const [title, ...descriptionParts] = item.split(' – ');
        const description = descriptionParts.join(' – ');

        return (
          <li className={cn('mt-4.5 border-l', borderStyle)} key={index}>
            <p
              className={cn(
                'mb-0.5 inline-block border-b px-2 pb-0.5 font-medium',
                borderStyle,
              )}
            >
              {title}
            </p>
            <p className="pl-2">{description}</p>
          </li>
        );
      })}
    </ul>
  );
}
