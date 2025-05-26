"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SidebarComponent from "./sidebarComponent";
import { useAuth } from "@/contexts/AuthContext";
import IconProvider from "../common/IconProvider";

const Sidebar = () => {
  const [selected, setSelected] = useState("Semua");
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

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
      
      {/* User Profile */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        {isLoading ? (
          <div className="flex justify-center">
            <IconProvider icon="ArrowPathIcon" className="w-5 h-5 animate-spin text-gray-500" />
          </div>
        ) : user ? (
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <IconProvider icon="UserCircleIcon" className="w-10 h-10 text-[#00608C] mr-3" />
              <div>
                <h3 className="font-medium text-[#00608C]">{user.username}</h3>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            {user.type && (
              <div className="flex items-center mt-1">
                <IconProvider icon="IdentificationIcon" className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500 capitalize">{user.type}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm">
            Not logged in
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between h-full mb-10">
        <ul className="space-y-4">
          {navItems.map(({ title, path, iconName }) => (
            <li key={title}>
              <SidebarComponent iconName={iconName} title={title} hoverColor="#ecf9ff" isClicked={selected === title} onClick={() => handleClick(title, path)} />
            </li>
          ))}
        </ul>
        <SidebarComponent 
          iconName="ArrowRightOnRectangleIcon" 
          title="Keluar" 
          hoverColor="#fadcdc" 
          isClicked={false} 
          onClick={logout} 
        />
      </div>
    </aside>
  );
};

export default Sidebar;
