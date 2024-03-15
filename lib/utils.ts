import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prepareDbData = <T extends Record<string, unknown>>(obj: T): T => {
  const res: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    res[key] = value === "" || value === 0 ? null : value;
  });

  return res as T;
};
