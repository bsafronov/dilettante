"use client";

import { buttonVariants } from "@/components/ui/button";
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
          "py-2 px-4 rounded-lg hover:bg-slate-100 flex items-center gap-2",
          pathname.includes(href) && "bg-sky-100 text-sky-700 hover:bg-sky-100"
        )}
      >
        <Icon />
        {title}
      </Link>
    </div>
  );
};
