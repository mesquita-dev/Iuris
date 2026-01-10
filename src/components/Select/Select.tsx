"use client";

import React, { useState } from "react";
import { Info, CaretDown } from "@phosphor-icons/react";

type SelectState = "default" | "error" | "disabled";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "placeholder" | "size"> {
  state?: SelectState;
  size?: "lg" | "md";
  label: string;
  icon?: "Info";
  hasIcon?: boolean;
  placeholder: string;
  hasHeading?: boolean;
  options: SelectOption[];
}

const getSelectClasses = (
  state: SelectState,
  isFocused: boolean,
  size: "lg" | "md" = "lg"
): string => {
  const heightClasses = size === "lg" ? "h-12" : "h-10";
  const paddingClasses = size === "lg" ? "px-3 py-3" : "px-3 py-2";
  const textClasses = size === "lg" ? "text-base leading-5" : "text-sm leading-5";
  const baseClasses =
    `w-full ${heightClasses} ${paddingClasses} font-sans font-normal ${textClasses} rounded border transition-colors outline-none appearance-none pr-10`;

  if (state === "disabled") {
    return `${baseClasses} border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed`;
  }

  if (state === "error") {
    return `${baseClasses} border-red-700 bg-base-white text-base-black`;
  }

  if (isFocused) {
    return `${baseClasses} border-base-black bg-base-white text-base-black`;
  }

  return `${baseClasses} border-gray-300 bg-base-white text-base-black`;
};

export const Select = React.memo<SelectProps>(
  ({
    state = "default",
    size = "lg",
    label,
    icon = "Info",
    hasIcon = false,
    placeholder,
    hasHeading = true,
    options,
    className = "",
    disabled,
    onFocus,
    onBlur,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const selectState = disabled ? "disabled" : state;
    const selectClasses = getSelectClasses(selectState, isFocused, size);
    const IconComponent = hasIcon && icon === "Info" ? Info : null;

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className="relative h-fit w-full min-w-fit">
        {hasHeading && (
          <div className="mb-2 2xl:mb-3 flex h-5 items-center justify-between gap-3">
            <label className={`font-sans font-medium whitespace-nowrap ${
              size === "lg" 
                ? "text-base leading-5 text-gray-800" 
                : "text-sm leading-[18px] text-gray-800"
            }`}>
              {label}
            </label>
            {IconComponent && (
              <IconComponent size={size === "lg" ? 20 : 16} weight="regular" className="text-gray-600" />
            )}
          </div>
        )}
        <div className="relative">
          <select
            className={`${selectClasses} ${className}`}
            disabled={disabled || selectState === "disabled"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          >
            <option value="" disabled className={size === "md" ? "text-gray-600" : ""}>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value} className={size === "md" ? "text-base-black" : ""}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <CaretDown size={size === "lg" ? 20 : 16} weight="regular" className="text-gray-600" />
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

