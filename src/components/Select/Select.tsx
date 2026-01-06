"use client";

import React, { useState } from "react";
import { Info, CaretDown } from "@phosphor-icons/react";

type SelectState = "default" | "error" | "disabled";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "placeholder"> {
  state?: SelectState;
  label: string;
  icon?: "Info";
  hasIcon?: boolean;
  placeholder: string;
  hasHeading?: boolean;
  options: SelectOption[];
}

const getSelectClasses = (
  state: SelectState,
  isFocused: boolean
): string => {
  const baseClasses =
    `w-full px-3 py-3 font-sans font-normal text-base leading-5 rounded border transition-colors outline-none appearance-none pr-10`;

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
    const selectClasses = getSelectClasses(selectState, isFocused);
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
          <div className="mb-3 flex h-5 items-center justify-between gap-3">
            <label className="font-sans text-base font-medium leading-5 text-gray-800 whitespace-nowrap">
              {label}
            </label>
            {IconComponent && (
              <IconComponent size={20} weight="regular" className="text-gray-600" />
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
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <CaretDown size={20} weight="regular" className="text-gray-600" />
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

