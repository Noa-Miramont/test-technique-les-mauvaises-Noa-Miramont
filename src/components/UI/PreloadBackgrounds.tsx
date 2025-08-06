// Preload les image au chargement pour éviter tout problème de performances sur des connexions lentes //

"use client";
import { usePreloadBackgrounds } from "@/hooks/usePreloadBackgrounds";

export function PreloadBackgrounds() {
  usePreloadBackgrounds();
  return null;
} 