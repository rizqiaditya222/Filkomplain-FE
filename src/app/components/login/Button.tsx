"use client";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({ label, onClick, type = "button", disabled = false }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`w-full py-2 px-4 rounded-md transition duration-300 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#00608C] text-white hover:bg-[#004d70]"}`}>
      {label}
    </button>
  );
}
