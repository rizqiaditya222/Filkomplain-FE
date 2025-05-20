"use client";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({ label, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-[#00608C] text-white py-2 px-4 rounded-md transition duration-300"
    >
      {label}
    </button>
  );
}
