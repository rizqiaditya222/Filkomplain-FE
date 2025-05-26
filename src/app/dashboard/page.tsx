"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import IconProvider from "../components/common/IconProvider";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Wait for authentication to complete, then redirect to all reports
    if (!isLoading) {
      router.push("/dashboard/all");
    }
  }, [isLoading, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <IconProvider icon="ArrowPathIcon" className="w-10 h-10 text-[#00608C] animate-spin" />
    </div>
  );
}
