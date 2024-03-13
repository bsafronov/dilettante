"use client";

import { LayoutDashboard, User2 } from "lucide-react";
import { NavbarItem } from "./navbar-item";

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
    <div className="p-2 border rounded-md flex flex-col gap-2">
      {links.map((link) => (
        <NavbarItem key={link.href} {...link} />
      ))}
    </div>
  );
};
