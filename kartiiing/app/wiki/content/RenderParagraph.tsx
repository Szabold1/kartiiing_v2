import { Paragraph } from "./WikiContentTypes";
import TextParagraph from "./TextParagraph";
import TextListParagraph from "./TextListParagraph";
import ImageParagraph from "./ImageParagraph";
import SubSectionParagraph from "./SubSectionParagraph";

interface Props {
  paragraph: Paragraph;
  level?: number;
}

const RenderParagraph = ({ paragraph, level = 1 }: Props) => {
  switch (paragraph.type) {
    case "text":
      return <TextParagraph value={paragraph.value} />;
    case "text-list":
      return <TextListParagraph value={paragraph.value} />;
    case "image":
      return (
        <ImageParagraph
          src={paragraph.src}
          alt={paragraph.alt}
          caption={paragraph.caption}
        />
      );
    case "sub-section":
      return (
        <SubSectionParagraph
          title={paragraph.title}
          id={paragraph.id}
          paragraphs={paragraph.paragraphs}
          level={level}
        />
      );
    default:
      return null;
  }
};

export default RenderParagraph;
