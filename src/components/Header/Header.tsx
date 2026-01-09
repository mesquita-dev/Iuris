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
import { useUser } from "@/contexts/UserContext";

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
  const [iconSize, setIconSize] = useState<16 | 20>(16);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getNewRequestsCount } = useMeetingRequests();
  const { user } = useUser();
  const newRequestsCount = getNewRequestsCount();
  const navItems = getNavItems(newRequestsCount);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 1366) {
        setButtonSize("md");
      } else {
        setButtonSize("lg");
      }
      if (window.innerWidth < 1536) {
        setIconSize(16);
      } else {
        setIconSize(20);
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
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-base-black">
              <span className="font-display text-sm leading-none text-base-white 2xl:text-lg 2xl:leading-6">I</span>
            </div>
            <span className="font-display text-xl leading-none text-base-black 2xl:leading-6">
              Iuris
            </span>
          </div>

          <nav className="hidden items-center gap-1 md:flex md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1 p-2.5 text-sm font-sans font-normal leading-5 transition-colors md:gap-2 2xl:text-base 2xl:leading-5 ${
                    isActive
                      ? "text-base-black"
                      : "text-gray-600 hover:text-base-black"
                  }`}
                >
                  <Icon size={iconSize} weight="regular" />
                  <span className="hidden lg:inline">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-700 text-xs font-sans font-bold leading-3 text-base-white">
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

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Button
            variant="fill"
            theme="primary"
            size="lg"
            label="Copiar link do perfil"
          />
          <div className="h-10 w-px bg-gray-300 2xl:h-12" />
          <div
            className="profile-dropdown-container relative flex items-start gap-3 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={user.profileImage || "/api/placeholder/48/48"}
              alt="Foto de perfil"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex flex-col gap-0.5 2xl:gap-1">
              <span className="font-sans text-sm font-medium leading-[18px] text-base-black 2xl:text-base 2xl:leading-6">
                {user.name.split(" ")[0]}
              </span>
              <span className="font-sans text-xs font-normal leading-5 text-gray-600">
                {user.plan}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <CaretDown size={iconSize} weight="regular" className="text-gray-600" />
            </div>
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-48 rounded border border-gray-300 bg-base-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-3 text-left font-sans text-xs font-normal leading-[18px] text-gray-800 hover:bg-gray-100"
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
                  className="flex w-full items-center gap-2 px-4 py-3 text-left font-sans text-xs font-normal leading-[18px] text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                >
                  <WhatsappLogo size={16} weight="regular" />
                  <span>Suporte</span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-3 text-left font-sans text-xs font-normal leading-[18px] text-red-600 hover:bg-gray-100"
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

