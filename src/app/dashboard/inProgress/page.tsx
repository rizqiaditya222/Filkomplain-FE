"use client";

import Table from "@/app/components/table";
import { useState, useEffect } from "react";
import reportService from "@/services/report-service";
import IconProvider from "@/app/components/common/IconProvider";

interface LaporanFormat {
  Username: string;
  Title: string;
  Description: string;
  Location: string;
  Phone: string;
  Status: string;
}

export default function InProgress() {
  const [reports, setReports] = useState<LaporanFormat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const response = await reportService.getAllReports();
        if (response.success) {
          const formattedReports = response.data
            .filter((report) => report.status === "processing")
            .map((report) => ({
              Username: report.userName,
              Title: report.content.substring(0, 20) + (report.content.length > 20 ? "..." : ""),
              Description: report.content,
              Location: report.place,
              Phone: report.phoneNumber,
              Status: "Diproses",
            }));
          setReports(formattedReports);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="px-20 py-10">
      <div className="bg-white p-8 shadow-xl rounded-xl">
        <h1 className="text-2xl font-bold mb-9 text-black">Laporan Diproses</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <IconProvider icon="ArrowPathIcon" className="w-10 h-10 text-[#00608C] animate-spin" />
          </div>
        ) : (
          <Table data={reports} filterStatus="Diproses" />
        )}
      </div>
    </div>
  );
}
