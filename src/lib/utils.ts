import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAnnotionsByName(name: string) {
  let annotion: string = "";
  name.split(" ").map((word: string) => (annotion += word[0].toUpperCase()));
  return annotion;
}
