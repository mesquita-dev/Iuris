"use client";

import React from "react";

type BadgeStatus = "success" | "warning" | "error" | "info";
type BadgeSize = "md" | "lg";

export interface BadgeProps {
  status: BadgeStatus;
  label: string;
  icon?: React.ComponentType<any>;
  hasIcon?: boolean;
  size?: BadgeSize;
}

const getBadgeClasses = (status: BadgeStatus, size: BadgeSize): string => {
  let baseClasses = "inline-flex items-center gap-2 rounded font-sans font-medium w-fit";

  if (size === "md") {
    baseClasses += " px-3 py-2 text-sm leading-4";
  } else {
    baseClasses += " px-4 py-2.5 text-base leading-5";
  }

  switch (status) {
    case "success":
      return `${baseClasses} bg-green-200 text-green-800`;
    case "warning":
      return `${baseClasses} bg-yellow-200 text-yellow-800`;
    case "error":
      return `${baseClasses} bg-red-200 text-red-800`;
    case "info":
      return `${baseClasses} bg-blue-200 text-blue-800`;
    default:
      return baseClasses;
  }
};

const getIconColor = (status: BadgeStatus): string => {
  switch (status) {
    case "success":
      return "text-green-800";
    case "warning":
      return "text-yellow-800";
    case "error":
      return "text-red-800";
    case "info":
      return "text-blue-800";
    default:
      return "";
  }
};

export const Badge = React.memo<BadgeProps>(
  ({
    status,
    label,
    icon,
    hasIcon = false,
    size = "lg",
  }) => {
    const Icon = hasIcon && icon ? icon : null;
    const badgeClasses = getBadgeClasses(status, size);
    const iconColor = getIconColor(status);
    const iconSize = size === "md" ? 16 : 20;

    return (
      <div className={badgeClasses}>
        {Icon && <Icon size={iconSize} weight="regular" className={iconColor} />}
        <span>{label}</span>
      </div>
    );
  }
);

Badge.displayName = "Badge";

