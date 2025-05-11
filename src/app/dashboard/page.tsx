"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/all");
  }, [router]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-8">
        <p>Mengarahkan ke login...</p>
      </div>
    </div>
  );
}
