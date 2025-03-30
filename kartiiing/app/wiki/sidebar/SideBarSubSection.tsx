import React from "react";

const SideBarSubSection = ({ children }: React.PropsWithChildren) => {
  return (
    <ul className="ml-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5">
      {children}
    </ul>
  );
};

export default SideBarSubSection;
