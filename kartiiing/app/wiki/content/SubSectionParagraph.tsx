import { JSX } from "react";
import { Paragraph } from "@/lib/types/WikiTypes";
import RenderParagraph from "./RenderParagraph";

interface Props {
  title: string;
  id?: string;
  paragraphs: Paragraph[];
  level?: number;
}

const SubSectionParagraph = ({ title, id, paragraphs, level = 1 }: Props) => {
  const HeadingTag = `h${level + 2}` as keyof JSX.IntrinsicElements;
  const headingStyles = `font-semibold pl-2 ${
    level === 1
      ? "text-lg border-l-4 border-blue-500"
      : "border-l-4 border-amber-400"
  }`;
  const subSectionStyles = `scroll-mt-20 ${level === 1 ? "mt-8" : "mt-7"}`;
  const subSectionSpanStyles = `block border-b border-dashed ${
    level === 1 ? "mb-3 pb-3 border-blue-500" : "mb-2 pb-2 border-amber-400"
  }`;

  return (
    <div className={subSectionStyles} id={id}>
      <span className={subSectionSpanStyles}>
        <HeadingTag className={headingStyles}>{title}</HeadingTag>
      </span>
      {paragraphs.map((paragraph, index) => (
        <RenderParagraph key={index} paragraph={paragraph} level={level + 1} />
      ))}
    </div>
  );
};

export default SubSectionParagraph;
