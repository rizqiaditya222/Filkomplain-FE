"use client";

import IconProvider, { IconType } from "../common/IconProvider";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
};

export default function Button({ label, onClick, type = "button", disabled = false, icon, iconPosition = "left" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 px-4 rounded-md transition duration-300 flex items-center justify-center ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#00608C] text-white hover:bg-[#004d70]"}`}
    >
      {icon && iconPosition === "left" && <IconProvider icon={icon} className="w-5 h-5 mr-2" />}
      {label}
      {icon && iconPosition === "right" && <IconProvider icon={icon} className="w-5 h-5 ml-2" />}
    </button>
  );
}
