"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SidebarComponent from "./sidebarComponent";

const Sidebar = () => {
  const [selected, setSelected] = useState("Semua");
  const router = useRouter();

  const navItems = [
    { title: "Semua", path: "/dashboard/all" },
    { title: "Diajukan", path: "/dashboard/pending" },
    { title: "Diproses", path: "/dashboard/inProgress" },
    { title: "Selesai", path: "/dashboard/done" },
  ];

  const handleClick = (title: string, path: string) => {
    setSelected(title);
    router.push(path);
  };

  return (
    <aside className="flex flex-col w-96 h-screen bg-white text-black px-10">
      <img src="/sidebar/logo.png" alt="logo" className="w-48 self-center py-10" />
      <ul className="space-y-4">
        {navItems.map(({ title, path }) => (
          <li key={title}>
            <SidebarComponent
              src="/sidebar/dashboard.png"
              title={title}
              isClicked={selected === title}
              onClick={() => handleClick(title, path)}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
