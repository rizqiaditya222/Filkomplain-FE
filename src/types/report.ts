export interface Report {
  id: number;
  userName: string;
  title: string;
  content: string;
  place: string;
  phoneNumber: string;
  status: string;
  attachment: string;
  reply: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReportResponse {
  id: number;
  user_name: string;
  title: string;
  content: string;
  place: string;
  phone_number: string;
  status: string;
  attachment: string;
  reply?: string;
  created_at: string;
  updated_at: string;
}

export const createDefaultReport = (): Report => ({
  id: 0,
  userName: "",
  title: "",
  content: "",
  place: "",
  phoneNumber: "",
  status: "pending",
  attachment: "",
  reply: "",
});

export const convertResponseToReport = (response: ReportResponse): Report => ({
  id: response.id,
  userName: response.user_name || "Anonymous User",
  title: response.title || "No Title",
  content: response.content || "",
  place: response.place,
  phoneNumber: response.phone_number || "Not provided",
  status: response.status,
  attachment: response.attachment,
  reply: response.reply || "",
  createdAt: response.created_at,
  updatedAt: response.updated_at,
});

export const formatReportDate = (dateString?: string): string => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return dateString;
  }
};

export const extractReportTitle = (report: Report): string => {
  return report.title || "No Title";
};

export const extractReportDescription = (report: Report): string => {
  return report.content || "";
};
