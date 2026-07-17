import { Section } from '@/lib/types/WikiTypes';
import { RenderParagraph } from './RenderParagraph';

type Props = {
  section: Section;
};

export function RenderSection({ section }: Props) {
  return (
    <section className="mt-12.5 scroll-mt-20" id={section.id}>
      <span className="mb-4 block border-b border-dashed border-red-600 pb-4">
        <h2 className="border-l-4 border-red-600 pl-2 text-2xl font-semibold">
          {section.title}
        </h2>
      </span>
      {section.paragraphs.map((paragraph, index) => (
        <RenderParagraph key={index} paragraph={paragraph} />
      ))}
    </section>
  );
}
