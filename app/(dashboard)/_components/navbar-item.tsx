"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  icon: LucideIcon;
  title: string;
};

export const NavbarItem = ({ href, icon: Icon, title }: Props) => {
  const pathname = usePathname();

  return (
    <div>
      <Link
        href={href}
        className={cn(
          "flex gap-2 items-center border rounded-md p-2",
          pathname === href && "bg-slate-100"
        )}
      >
        <Icon />
        {title}
      </Link>
    </div>
  );
};
