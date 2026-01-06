"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Calendar,
  UserCircle,
  Scroll,
  SignOut,
  CaretDown,
  Gear,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Button } from "@/components/Button";
import { useMeetingRequests } from "@/contexts/MeetingRequestsContext";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

const getNavItems = (badgeCount: number): NavItem[] => [
  { href: "/", label: "Página inicial", icon: House },
  { href: "/agenda", label: "Agenda", icon: Calendar },
  { href: "/perfil", label: "Meu perfil", icon: UserCircle },
  { href: "/pedidos", label: "Pedidos de reunião", icon: Scroll, badge: badgeCount },
];

export const Header = React.memo(() => {
  const pathname = usePathname();
  const router = useRouter();
  const [buttonSize, setButtonSize] = useState<"lg" | "md">("lg");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getNewRequestsCount } = useMeetingRequests();
  const newRequestsCount = getNewRequestsCount();
  const navItems = getNavItems(newRequestsCount);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 1366) {
        setButtonSize("md");
      } else {
        setButtonSize("lg");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="w-full bg-base-white">
      <div className="flex flex-wrap items-center justify-between gap-x4 px-x6 py-x4 md:px-x6 md:py-x4">
        <div className="flex items-center gap-x3 md:gap-x6">
          <div className="flex items-center gap-x2 md:gap-x3">
            <div className="flex h-8 w-8 items-center justify-center rounded-x2 bg-base-black md:h-x10 md:w-x10">
              <span className="font-display text-lg leading-[1em] text-base-white md:text-[1.5rem] md:leading-[1.5rem]">I</span>
            </div>
            <span className="font-display text-lg leading-[1em] text-base-black md:text-[1.5rem] md:leading-[1.5rem]">
              Iuris
            </span>
          </div>

          <nav className="hidden items-center gap-x1 md:flex md:gap-x2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-x1 px-x2 py-x2 text-sm font-sans font-normal leading-[1.25em] transition-colors md:gap-x2 md:text-[1rem] md:leading-[1.25rem] ${
                    buttonSize === "md" ? "px-x3 py-[10px]" : "px-x3 py-x3"
                  } ${
                    isActive
                      ? "text-base-black"
                      : "text-gray-600 hover:text-base-black"
                  }`}
                >
                  <Icon size={20} weight="regular" />
                  <span className="hidden lg:inline">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-x6 w-x6 items-center justify-center rounded-x1000 bg-red-700 text-[0.75rem] font-sans font-bold leading-[0.75rem] text-base-white">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-base-black" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-x2 md:gap-x4">
          <Button
            variant="fill"
            theme="primary"
            size="lg"
            label="Copiar link do perfil"
          />
          <div className="h-12 w-px bg-gray-300" />
          <div
            className="profile-dropdown-container relative flex items-start gap-x3 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="/api/placeholder/48/48"
              alt="Foto de perfil"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                Guilherme
              </span>
              <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-gray-600">
                Plano gratuito
              </span>
            </div>
            <div className="flex items-center justify-center">
              <CaretDown size={20} weight="regular" className="text-gray-600" />
            </div>
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-x2 w-48 rounded-x2 border border-gray-300 bg-base-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-x2 px-x4 py-[15px] text-left font-sans text-[0.75rem] font-normal leading-[1.125rem] text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/configuracoes");
                  }}
                >
                  <Gear size={16} weight="regular" />
                  <span>Configurações</span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-x2 px-x4 py-[15px] text-left font-sans text-[0.75rem] font-normal leading-[1.125rem] text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                >
                  <WhatsappLogo size={16} weight="regular" />
                  <span>Suporte</span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-x2 px-x4 py-[15px] text-left font-sans text-[0.75rem] font-normal leading-[1.125rem] text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                >
                  <SignOut size={16} weight="regular" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

