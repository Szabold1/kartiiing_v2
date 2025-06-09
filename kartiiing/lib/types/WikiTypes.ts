type ParagraphImage = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
};

type SubSection = {
  type: "sub-section";
  id?: string;
  title: string;
  shortTitle?: string;
  paragraphs: Paragraph[];
};

type Paragraph =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "text-list";
      value: string[];
    }
  | ParagraphImage
  | SubSection;

interface Section {
  id?: string;
  title: string;
  shortTitle?: string;
  paragraphs: Paragraph[];
}

interface WikiContent {
  pageTitle: string;
  sections: Section[];
}

export type { WikiContent, Section, SubSection, Paragraph };
