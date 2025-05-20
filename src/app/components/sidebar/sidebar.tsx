"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SidebarComponent from "./sidebarComponent";

const Sidebar = () => {
  const [selected, setSelected] = useState("Semua");
  const router = useRouter();

  const navItems = [
    { title: "Semua", path: "/dashboard/all", iconName: "HomeIcon" },
    { title: "Diajukan", path: "/dashboard/pending", iconName: "ClipboardDocumentIcon" },
    { title: "Diproses", path: "/dashboard/inProgress", iconName: "ClockIcon" },
    { title: "Selesai", path: "/dashboard/done", iconName: "CheckCircleIcon" },
  ];

  const handleClick = (title: string, path: string) => {
    setSelected(title);
    router.push(path);
  };

  return (
    <aside className="flex flex-col w-96 h-auto bg-white text-black px-10">
      <Image src="/sidebar/logo.png" alt="logo" className="w-48 self-center py-10" width={100} height={100} />
      <div className="flex flex-col justify-between h-full mb-10">
        <ul className="space-y-4">
          {navItems.map(({ title, path, iconName }) => (
            <li key={title}>
              <SidebarComponent iconName={iconName} title={title} hoverColor="#ecf9ff" isClicked={selected === title} onClick={() => handleClick(title, path)} />
            </li>
          ))}
        </ul>
        <SidebarComponent iconName="ArrowRightOnRectangleIcon" title="Keluar" hoverColor="#fadcdc" isClicked={false} onClick={() => handleClick("Keluar", "/login")} />
      </div>
    </aside>
  );
};

export default Sidebar;
