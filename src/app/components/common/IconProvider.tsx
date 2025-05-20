"use client";

import * as SolidIcons from "@heroicons/react/24/solid";
import * as OutlineIcons from "@heroicons/react/24/outline";

export type IconType = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface IconProviderProps {
  icon: IconType;
  variant?: "solid" | "outline";
  className?: string;
}

const IconProvider = ({ icon, variant = "outline", className = "w-6 h-6" }: IconProviderProps) => {
  const IconComponent = variant === "solid" ? SolidIcons[icon] : OutlineIcons[icon];

  // Safety check if icon doesn't exist
  if (!IconComponent) {
    console.warn(`Icon ${icon} not found in ${variant} variant`);
    return null;
  }

  return <IconComponent className={className} />;
};

export default IconProvider;
