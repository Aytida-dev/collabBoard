import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAnnotionsByName(name: string) {
  let annotion: string = "";
  name.split(" ").map((word: string) => (annotion += word[0].toUpperCase()));
  return annotion;
}

export function downloadImage(base64String: string, filename: string) {
  const link = document.createElement("a");
  link.href = base64String;
  link.download = filename; // Set the filename for the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
