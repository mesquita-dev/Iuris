"use client";

import React from "react";
import { Check } from "@phosphor-icons/react";

type PillState = "active" | "default";
type PillVersion = "radio" | "checkbox";

export interface PillProps {
  state?: PillState;
  version: PillVersion;
  label: string;
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const getPillClasses = (state: PillState): string => {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans text-base font-normal leading-5 transition-colors w-fit whitespace-nowrap box-border";

  if (state === "active") {
    return `${baseClasses} bg-base-white border border-base-black text-base-black`;
  }

  return `${baseClasses} bg-base-white border border-gray-300 text-gray-600`;
};

const getCheckboxClasses = (isChecked: boolean, isDisabled: boolean): string => {
  const baseClasses = "flex h-5 w-5 items-center justify-center rounded border transition-colors";

  if (isDisabled) {
    return `${baseClasses} border-gray-300 bg-gray-200`;
  }

  if (isChecked) {
    return `${baseClasses} border-base-black bg-base-black`;
  }

  return `${baseClasses} border-gray-300 bg-base-white`;
};

const getRadioClasses = (isSelected: boolean): string => {
  const baseClasses = "flex h-5 w-5 items-center justify-center rounded-full border transition-colors";

  if (isSelected) {
    return `${baseClasses} border-base-black`;
  }

  return `${baseClasses} border-gray-600`;
};

export const Pill = React.memo<PillProps>(
  ({
    state = "default",
    version,
    label,
    name,
    value,
    checked,
    onChange,
    disabled,
  }) => {
    const visualState = checked !== undefined ? (checked ? "active" : "default") : state;
    const pillClasses = getPillClasses(visualState);
    const isChecked = checked !== undefined ? checked : state === "active";
    const inputId = `pill-${version}-${value || label}-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label
        htmlFor={inputId}
        className={`${pillClasses} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {version === "checkbox" ? (
          <>
            <div className={getCheckboxClasses(isChecked, disabled || false)}>
              {isChecked && (
                <Check size={12} weight="regular" className="text-base-white" />
              )}
            </div>
            <input
              type="checkbox"
              id={inputId}
              value={value}
              checked={isChecked}
              disabled={disabled}
              onChange={onChange}
              className="sr-only"
            />
          </>
        ) : (
          <>
            <div className={getRadioClasses(isChecked)}>
              {isChecked && (
                <div className="h-2 w-2 rounded-full bg-base-black" />
              )}
            </div>
            <input
              type="radio"
              id={inputId}
              name={name || "pill-radio"}
              value={value || label}
              checked={isChecked}
              disabled={disabled}
              onChange={onChange}
              className="sr-only"
            />
          </>
        )}
        <span>{label}</span>
      </label>
    );
  }
);

Pill.displayName = "Pill";

