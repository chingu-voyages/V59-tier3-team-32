import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { validRoles } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidRole = (role: string) => {
  return validRoles.includes(role);
};
