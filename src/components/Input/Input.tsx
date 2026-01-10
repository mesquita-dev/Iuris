"use client";

import React, { useState } from "react";
import { Info } from "@phosphor-icons/react";

type InputState = "default" | "error" | "disabled";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder" | "size"> {
  state?: InputState;
  size?: "lg" | "md";
  label: string;
  icon?: "Info";
  hasIcon?: boolean;
  placeholder: string;
  hasHeading?: boolean;
}

const getInputClasses = (
  state: InputState,
  isFocused: boolean,
  size: "lg" | "md" = "lg"
): string => {
  const heightClasses = size === "lg" ? "h-12" : "h-10";
  const paddingClasses = size === "lg" ? "px-3 py-3" : "px-3 py-2";
  const textClasses = size === "lg" ? "text-base leading-5" : "text-sm leading-5";
  const baseClasses =
    `w-full ${heightClasses} ${paddingClasses} font-sans font-normal ${textClasses} rounded border transition-colors outline-none`;

  const placeholderClasses = size === "lg" ? "placeholder:text-gray-400" : "placeholder:text-gray-600";

  if (state === "disabled") {
    return `${baseClasses} border-gray-300 bg-gray-200 text-gray-500 placeholder:text-gray-400 cursor-not-allowed`;
  }

  if (state === "error") {
    return `${baseClasses} border-red-700 bg-base-white text-base-black placeholder:text-red-700`;
  }

  if (isFocused) {
    return `${baseClasses} border-base-black bg-base-white text-base-black ${placeholderClasses}`;
  }

  return `${baseClasses} border-gray-300 bg-base-white text-base-black ${placeholderClasses}`;
};

export const Input = React.memo<InputProps>(
  ({
    state = "default",
    size = "lg",
    label,
    icon = "Info",
    hasIcon = false,
    placeholder,
    hasHeading = true,
    className = "",
    disabled,
    onFocus,
    onBlur,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputState = disabled ? "disabled" : state;
    const inputClasses = getInputClasses(inputState, isFocused, size);
    const IconComponent = hasIcon && icon === "Info" ? Info : null;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className="h-fit w-full min-w-fit">
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
        <input
          type="text"
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

