"use client";

import React, { useState } from "react";
import { Info } from "@phosphor-icons/react";

type InputState = "default" | "error" | "disabled";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  state?: InputState;
  label: string;
  icon?: "Info";
  hasIcon?: boolean;
  placeholder: string;
  width?: string;
  hasHeading?: boolean;
}

const getInputClasses = (
  state: InputState,
  isFocused: boolean,
  width?: string
): string => {
  const widthClass = width ? "" : "w-full";
  const baseClasses =
    `${widthClass} px-3 py-3 font-sans font-normal text-base leading-5 rounded border transition-colors outline-none`;

  if (state === "disabled") {
    return `${baseClasses} border-gray-300 bg-gray-200 text-gray-500 placeholder:text-gray-400 cursor-not-allowed`;
  }

  if (state === "error") {
    return `${baseClasses} border-red-700 bg-base-white text-base-black placeholder:text-red-700`;
  }

  if (isFocused) {
    return `${baseClasses} border-base-black bg-base-white text-base-black placeholder:text-gray-400`;
  }

  return `${baseClasses} border-gray-300 bg-base-white text-base-black placeholder:text-gray-400`;
};

export const Input = React.memo<InputProps>(
  ({
    state = "default",
    label,
    icon = "Info",
    hasIcon = false,
    placeholder,
    width,
    hasHeading = true,
    className = "",
    disabled,
    onFocus,
    onBlur,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputState = disabled ? "disabled" : state;
    const inputClasses = getInputClasses(inputState, isFocused, width);
    const IconComponent = hasIcon && icon === "Info" ? Info : null;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const containerStyle = width ? { width } : {};
    const inputStyle = width ? { width } : {};

    return (
      <div style={containerStyle} className={`h-fit ${width ? "" : "w-full"}`}>
        {hasHeading && (
          <div className="mb-3 flex h-5 items-center justify-between gap-3">
            <label className="font-sans text-base font-medium leading-5 text-gray-800">
              {label}
            </label>
            {IconComponent && (
              <IconComponent size={20} weight="regular" className="text-gray-600" />
            )}
          </div>
        )}
        <input
          type="text"
          style={inputStyle}
          className={`${inputClasses} ${className}`}
          placeholder={placeholder}
          disabled={disabled || inputState === "disabled"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

