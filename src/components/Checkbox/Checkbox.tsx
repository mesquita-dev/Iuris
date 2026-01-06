"use client";

import React, { useState } from "react";
import { Check } from "@phosphor-icons/react";

type CheckboxState = "default" | "disabled" | "checkedDisabled";
type CheckboxSize = "lg" | "md";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  state?: CheckboxState;
  label: string;
  hasLabel?: boolean;
  size?: CheckboxSize;
}

const getCheckboxClasses = (
  isChecked: boolean,
  isDisabled: boolean,
  isCheckedDisabled: boolean,
  size: CheckboxSize
): string => {
  const sizeClasses = size === "md" ? "h-x5 w-x5" : "h-x7 w-x7";
  const baseClasses = `flex ${sizeClasses} items-center justify-center rounded-x2 border transition-colors`;

  if (isCheckedDisabled) {
    return `${baseClasses} border-gray-300 bg-gray-200 cursor-not-allowed`;
  }

  if (isDisabled) {
    return `${baseClasses} border-gray-300 bg-gray-200 cursor-not-allowed`;
  }

  if (isChecked) {
    return `${baseClasses} border-base-black bg-base-black cursor-pointer`;
  }

  return `${baseClasses} border-gray-300 bg-base-white cursor-pointer`;
};

export const Checkbox = React.memo<CheckboxProps>(
  ({
    state,
    label,
    hasLabel = true,
    size = "lg",
    className = "",
    disabled,
    checked: controlledChecked,
    onChange,
    ...props
  }) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(false);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;
    const isCheckedDisabled = state === "checkedDisabled";
    const isDisabled = disabled || state === "disabled" || isCheckedDisabled;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const checkboxClasses = getCheckboxClasses(isChecked, isDisabled, isCheckedDisabled, size);
    const labelClasses = size === "md"
      ? `font-sans text-[1rem] font-normal leading-[1.25rem]`
      : `font-sans text-[1.25rem] font-medium leading-[1.5rem]`;

    return (
      <label className={`flex items-center gap-x2 ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}>
        <div className={checkboxClasses}>
          {isChecked && (
            <Check size={size === "md" ? 12 : 16} weight="regular" className={isCheckedDisabled ? "text-gray-400" : "text-base-white"} />
          )}
        </div>
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        {hasLabel && (
          <span className={`${labelClasses} ${isCheckedDisabled ? "text-gray-400" : isDisabled ? "text-gray-500" : "text-base-black"}`}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

