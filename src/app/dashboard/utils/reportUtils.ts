import { Report } from "@/types/report";

export function mapStatus(status: string): string {
  switch (status) {
    case "pending":
    case "hold":
      return "Diajukan";
    case "processing":
    case "processed":
      return "Diproses";
    case "completed":
    case "finished":
      return "Selesai";
    default:
      return "Diajukan"; // Default to "Diajukan" for any other status
  }
}

export function getStatusStyle(status: string) {
  switch (status) {
    case "Selesai":
      return "bg-[#a6e7d8] text-[#048464] border border-[#048464]";
    case "Diajukan":
      return "bg-[#fccccc] text-[#de1010] border border-[#de1010]";
    case "Diproses":
      return "bg-[#fbd3b4] text-[#e88c22] border border-[#e88c22]";
    default:
      return "bg-[#fccccc] text-[#de1010] border border-[#de1010]"; // Default to Diajukan style
  }
}

// Export this interface to be reused in other components
export interface LaporanFormat {
  Username: string;
  Title: string;
  Description: string;
  Location: string;
  Phone: string;
  Status: string;
  Id: number;
  Attachment?: string;
  CreatedAt?: string;
}

export const convertReportToLaporan = (report: Report): LaporanFormat => {
  return {
    Id: report.id,
    Username: report.userName || "Anonymous User",
    Title: report.title || "No Title",
    Description: report.content || "",
    Location: report.place,
    Phone: report.phoneNumber || "Not provided",
    Status: mapStatus(report.status),
    Attachment: report.attachment,
    CreatedAt: report.createdAt,
  };
};
