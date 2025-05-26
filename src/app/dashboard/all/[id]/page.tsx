"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IconProvider from "@/app/components/common/IconProvider";
import { Report, formatReportDate, extractReportDescription } from "@/types/report";
import reportService from "@/services/report-service";
import { getStatusStyle, mapStatus } from "../../utils/reportUtils";

// Simplify status options to only three
const statusOptions = ["Diajukan", "Diproses", "Selesai"];

// Map UI status back to API status values
const reverseStatusMap: Record<string, string> = {
  Diajukan: "hold",
  Diproses: "processing",
  Selesai: "completed",
};

export default function DetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      if (!id || isNaN(Number(id))) {
        setErrorMessage("Invalid report ID");
        return;
      }

      const response = await reportService.getReportById(Number(id));
      if (response.success && response.data) {
        setReport(response.data);
        setStatus(mapStatus(response.data.status));
      } else {
        setErrorMessage("Report not found");
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      setErrorMessage("Failed to load report");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  const handleSaveStatus = async () => {
    if (!report || !id) return;

    setIsUpdating(true);
    try {
      // Convert UI status back to API status
      const apiStatus = reverseStatusMap[status] || "pending";

      const response = await reportService.updateReportStatus(Number(id), apiStatus);
      if (response.success) {
        setSuccessMessage("Status updated successfully");
        setReport(response.data);
        setIsEditing(false);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setErrorMessage("An error occurred while updating status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <IconProvider icon="ArrowPathIcon" className="w-10 h-10 text-[#00608C] animate-spin" />
      </div>
    );
  }

  if (errorMessage && !report) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{errorMessage}</p>
        <button className="bg-[#00608C] text-white px-4 py-2 rounded" onClick={() => router.push("/dashboard/all")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!report) return null;

  // No need to extract title from content anymore
  const title = report.title || "No Title";
  const description = report.content || "";

  // Format description with proper line breaks
  const formattedDescription = description.split("\n").map((line, i) => (
    <p key={i} className="mb-2">
      {line}
    </p>
  ));

  return (
    <div className="flex flex-col h-full px-10 py-6">
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
          <IconProvider icon="CheckCircleIcon" className="w-5 h-5 mr-2" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
          <IconProvider icon="ExclamationTriangleIcon" className="w-5 h-5 mr-2" />
          {errorMessage}
        </div>
      )}

      <div className="flex flex-row h-full">
        <button className="h-14 mr-6 cursor-pointer flex items-center justify-center" onClick={() => router.back()}>
          <IconProvider icon="ArrowLeftIcon" className="h-10 w-10 text-gray-600" />
        </button>

        <div className="flex flex-col w-full h-full mb-10">
          <p className="text-2xl font-semibold text-black mb-2">{title}</p>

          <div className="flex w-full">
            <p className="text-[#9197B3] mr-2.5 text-sm">Tanggal laporan</p>
            <p className="text-black text-sm">{formatReportDate(report.createdAt)}</p>
          </div>

          {report.attachment && (
            <div className="flex items-center w-full justify-center py-10">
              <div className="w-2xl h-2xl rounded-2xl overflow-hidden">
                <img src={report.attachment} alt="Gambar Laporan" className="w-full h-auto max-h-[400px] object-contain" />
              </div>
            </div>
          )}

          <div className="w-full border-2 p-5 rounded-2xl flex flex-row">
            {/* Label */}
            <div className="mr-5">
              <Text color="#ABABC4" text="Nama Pengguna" />
              <Text color="#ABABC4" text="Deskripsi" />
              <Text color="#ABABC4" text="Lokasi" />
              <Text color="#ABABC4" text="Nomor Telepon" />
              <Text color="#ABABC4" text="Status" />
            </div>

            {/* Value */}
            <div className="flex-1">
              <Text color="#000000" text={report.userName || "Anonymous User"} />
              <div className="my-7 mx-5 text-lg text-black">{formattedDescription.length > 0 ? formattedDescription : <p>No detailed description provided</p>}</div>
              <Text color="#000000" text={report.place} />
              <Text color="#000000" text={report.phoneNumber || "Not provided"} />
              {isEditing ? (
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="mx-5 w-40 h-8 px-2 rounded border text-sm text-black">
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={`mx-5 w-20 h-8 flex justify-center items-center rounded-[5px] text-sm font-semibold ${getStatusStyle(status)}`}>{status}</span>
              )}
            </div>
          </div>

          <button
            className={`mt-5 ml-auto flex flex-row items-center px-4 py-2 rounded-md cursor-pointer w-fit gap-2 ${isEditing ? "bg-green-600 hover:bg-green-700 text-white" : "bg-[#AF3904] hover:bg-[#923003] text-white"}`}
            onClick={() => {
              if (isEditing) {
                handleSaveStatus();
              } else {
                setIsEditing(true);
              }
            }}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <IconProvider icon="ArrowPathIcon" className="w-5 h-5 animate-spin" />
                <p>Saving...</p>
              </>
            ) : (
              <>
                <IconProvider icon={isEditing ? "CheckIcon" : "PencilSquareIcon"} className="w-5 h-5" />
                <p>{isEditing ? "Save" : "Edit Status"}</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Text({ color, text }: { color: string; text: string }) {
  return (
    <p style={{ color }} className="text-lg my-7 mx-5">
      {text}
    </p>
  );
}
