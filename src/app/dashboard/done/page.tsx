"use client";

import Table from "@/app/components/table";
import { useState, useEffect } from "react";
import reportService from "@/services/report-service";
import IconProvider from "@/app/components/common/IconProvider";
import { extractReportTitle } from "@/types/report";
import { LaporanFormat } from "../utils/reportUtils";

export default function Done() {
  const [reports, setReports] = useState<LaporanFormat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const response = await reportService.getAllReports();
        if (response.success) {
          const formattedReports = response.data
            .filter((report) => report.status === "completed" || report.status === "finished")
            .map((report) => ({
              Username: report.userName || "Anonymous User",
              Title: report.title || "No Title",
              Description: report.content || "",
              Location: report.place,
              Phone: report.phoneNumber || "Not provided",
              Status: "Selesai",
              Id: report.id,
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
        <h1 className="text-2xl font-bold mb-9 text-black">Laporan Selesai</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <IconProvider icon="ArrowPathIcon" className="w-10 h-10 text-[#00608C] animate-spin" />
          </div>
        ) : (
          <Table data={reports} filterStatus="Selesai" />
        )}
      </div>
    </div>
  );
}
