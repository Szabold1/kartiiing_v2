import { Section } from "@/lib/types/WikiTypes";
import RenderParagraph from "./RenderParagraph";

interface Props {
  section: Section;
}

const RenderSection = ({ section }: Props) => {
  return (
    <section className="mt-12.5 scroll-mt-20" id={section.id}>
      <span className="block mb-4 pb-4 border-b border-dashed border-red-600">
        <h2 className="text-2xl font-semibold border-l-4 pl-2 border-red-600">
          {section.title}
        </h2>
      </span>
      {section.paragraphs.map((paragraph, index) => (
        <RenderParagraph key={index} paragraph={paragraph} />
      ))}
    </section>
  );
};

export default RenderSection;
