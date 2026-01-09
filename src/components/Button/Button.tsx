"use client";

import React, { useState, useEffect } from "react";
import { Check } from "@phosphor-icons/react";

type ButtonVariant = "fill" | "outline" | "ghost";
type ButtonTheme = "primary" | "danger";
type ButtonSize = "lg" | "md";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  size?: ButtonSize;
  label: string;
  hasIconLeft?: boolean;
  iconLeft?: boolean;
  iconRight?: boolean;
  hasIconRight?: boolean;
  customIconLeft?: React.ComponentType<any>;
  customIconRight?: React.ComponentType<any>;
}

const getButtonClasses = (
  variant: ButtonVariant,
  theme: ButtonTheme,
  size: ButtonSize
): string => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-sans font-normal text-base leading-5 rounded transition-colors cursor-pointer box-border";
  const paddingClasses = {
    lg: {
      fill: "px-4 py-3.5",
      outline: "px-4 py-3",
      ghost: "px-4 py-3.5",
    },
    md: {
      fill: "px-3 py-2.5",
      outline: "px-3 py-2",
      ghost: "px-3 py-2.5",
    },
  };
  const variantThemeClasses = {
    fill: {
      primary: "bg-base-black text-base-white hover:bg-gray-900",
      danger: "bg-red-700 text-base-white hover:bg-red-800",
    },
    outline: {
      primary: "bg-transparent border-[1px] border-base-black text-base-black hover:bg-gray-100",
      danger: "bg-transparent border-[1px] border-red-700 text-red-700 hover:bg-red-100",
    },
    ghost: {
      primary: "bg-transparent text-base-black hover:bg-gray-100",
      danger: "bg-transparent text-red-700 hover:bg-red-100",
    },
  };
  return `${baseClasses} ${paddingClasses[size][variant]} ${variantThemeClasses[variant][theme]}`;
};

export const Button = React.memo<ButtonProps>(
  ({
    variant = "fill",
    theme = "primary",
    size = "md",
    label,
    hasIconLeft = false,
    iconLeft = false,
    hasIconRight = false,
    iconRight = false,
    customIconLeft,
    customIconRight,
    className = "",
    ...props
  }) => {
    const [actualSize, setActualSize] = useState<ButtonSize>(size);

    useEffect(() => {
      if (size === "lg") {
        const checkScreenSize = () => {
          if (window.innerWidth >= 1536) {
            setActualSize("lg");
          } else {
            setActualSize("md");
          }
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
      } else {
        setActualSize(size);
      }
    }, [size]);

    const buttonClasses = getButtonClasses(variant, theme, actualSize);
    const LeftIcon = customIconLeft || (hasIconLeft && iconLeft ? Check : null);
    const RightIcon = customIconRight || (hasIconRight && iconRight ? Check : null);
    
    return (
      <button type="button" className={`${buttonClasses} ${className}`} {...props}>
        {LeftIcon && (
          <LeftIcon size={20} weight="regular" />
        )}
        {label}
        {RightIcon && (
          <RightIcon size={20} weight="regular" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
