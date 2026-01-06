"use client";

import React, { useState } from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  value: string;
  name: string;
}

const getRadioClasses = (isSelected: boolean): string => {
  const baseClasses = "flex h-x5 w-x5 items-center justify-center rounded-x1000 border transition-colors";

  if (isSelected) {
    return `${baseClasses} border-base-black cursor-pointer`;
  }

  return `${baseClasses} border-gray-600 cursor-pointer`;
};

export const Radio = React.memo<RadioProps>(
  ({
    label,
    value,
    name,
    className = "",
    disabled,
    checked: controlledChecked,
    defaultChecked,
    onChange,
    ...props
  }) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked ?? false);
    const isControlled = controlledChecked !== undefined;
    const isSelected = isControlled ? controlledChecked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const radioClasses = getRadioClasses(isSelected);

    return (
      <label className={`flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}>
        <div className={radioClasses}>
          {isSelected && (
            <div className="h-x2 w-x2 rounded-x1000 bg-base-black" />
          )}
        </div>
        <input
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        <span className={`font-sans text-[1.25rem] font-medium leading-[1.5rem] ${disabled ? "text-gray-500" : "text-base-black"}`}>
          {label}
        </span>
      </label>
    );
  }
);

Radio.displayName = "Radio";

