import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOldPrice(price: number, discountPercent?: number): string | undefined {
  if (!discountPercent) return undefined;
  return (price / (1 - discountPercent / 100)).toFixed(2);
}