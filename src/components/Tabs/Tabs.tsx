"use client";

import React from "react";

type TabState = "default" | "active";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  hasIcon?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  defaultActiveTabId?: string;
}

const getTabClasses = (state: TabState): string => {
  const baseClasses = "flex items-center gap-x2 px-x5 py-[14px] font-sans text-[1rem] font-normal leading-[1.25rem] transition-colors cursor-pointer rounded-x1000 h-12";

  if (state === "active") {
    return `${baseClasses} bg-base-black text-base-white`;
  }

  return `${baseClasses} bg-base-white text-gray-600 border border-gray-300`;
};

export const Tabs = React.memo<TabsProps>(
  ({
    tabs,
    activeTabId,
    onTabChange,
    defaultActiveTabId,
  }) => {
    const [internalActiveTab, setInternalActiveTab] = React.useState<string>(
      defaultActiveTabId || tabs[0]?.id || ""
    );

    const currentActiveTab = activeTabId !== undefined ? activeTabId : internalActiveTab;

    const handleTabClick = (tabId: string) => {
      if (activeTabId === undefined) {
        setInternalActiveTab(tabId);
      }
      onTabChange?.(tabId);
    };

    return (
      <div className="flex items-center gap-x4 mb-x6">
        {tabs.map((tab) => {
          const state: TabState = currentActiveTab === tab.id ? "active" : "default";
          const Icon = tab.hasIcon && tab.icon ? tab.icon : null;
          const tabClasses = getTabClasses(state);
          const iconColor = state === "active" ? "text-base-white" : "text-gray-600";

          return (
            <button
              key={tab.id}
              type="button"
              className={tabClasses}
              onClick={() => handleTabClick(tab.id)}
            >
              {Icon && <Icon size={20} weight="regular" className={iconColor} />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

