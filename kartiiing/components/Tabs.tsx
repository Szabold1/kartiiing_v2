"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
  onClick?: () => void;
};

type Props = {
  tabs: Tab[];
  defaultTab?: string;
};

export default function Tabs({ tabs, defaultTab }: Props) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <>
      <div className="flex mb-4 border-b border-t border-dashed border-zinc-500 overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.onClick) tab.onClick();
              else setActiveTab(tab.id);
            }}
            className={`relative px-3 py-2 font-medium transition-all duration-200 cursor-pointer hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1
                ${
                  activeTab === tab.id ? "text-red-600 dark:text-red-500" : ""
                }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTabContent}
        </motion.div>
      </div>
    </>
  );
}
