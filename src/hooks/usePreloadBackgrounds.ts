"use client";
import { useEffect } from "react";
import { BACKGROUND_IMAGES } from "@/lib/projectMapping";

export function usePreloadBackgrounds() {
  useEffect(() => {
    BACKGROUND_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);
} 