import SideBarLink from "./SideBarLink";
import SideBarSubSection from "./SideBarSubSection";
import data from "../content/WikiContent";
import { Section, SubSection } from "../content/WikiContentTypes";

const SideBarMenu = () => {
  const renderLinks = (sections: Section[] | SubSection[]) => {
    return sections.map((section, index) => {
      if (!section.id) return null;

      const title =
        "shortTitle" in section && section.shortTitle
          ? section.shortTitle
          : section.title;
      const subSections =
        section.paragraphs?.filter((p) => p.type === "sub-section") || [];

      return (
        <div key={index}>
          <SideBarLink href={`#${section.id}`}>{title}</SideBarLink>

          {subSections.length > 0 && (
            <SideBarSubSection>{renderLinks(subSections)}</SideBarSubSection>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-1 py-5 pr-7 lg:fixed top-18 w-3xs">
      {renderLinks(data.sections as Section[])}
    </div>
  );
};

export default SideBarMenu;
