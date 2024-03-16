"use client";

import { LayoutDashboard, User2 } from "lucide-react";
import { NavbarItem } from "./navbar-item";
import { Card } from "@/components/ui/card";

const links = [
  {
    title: "Админка",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Пользователи",
    icon: User2,
    href: "/users",
  },
];

export const Navbar = () => {
  return (
    <Card classNameContent="flex flex-col gap-2" className="sticky top-4">
      {links.map((link) => (
        <NavbarItem key={link.href} {...link} />
      ))}
    </Card>
  );
};
