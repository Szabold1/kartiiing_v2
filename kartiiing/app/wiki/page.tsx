import SideBarMenu from "./sidebar/SideBarMenu";
import data from "./content/WikiContent";
import RenderSection from "./content/RenderSection";
import Aside from "@/components/Aside";

const WikiPage = () => {
  return (
    <div className="container flex flex-1 items-stretch justify-between mx-auto lg:mx-0">
      <Aside position="left" visibilityFrom="lg">
        <SideBarMenu />
      </Aside>

      <section className="flex-1 max-w-[43rem] mx-auto px-1 lg:px-8 xl:px-0">
        <div className="px-1 sm:px-5 md:px-6 py-10 lg:py-10 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {data.pageTitle}
          </h1>
          {data.sections.map((section, index) => (
            <RenderSection key={index} section={section} />
          ))}
        </div>
      </section>

      <Aside position="right" visibilityFrom="xl"></Aside>
    </div>
  );
};

export default WikiPage;
