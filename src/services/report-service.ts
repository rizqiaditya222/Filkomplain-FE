import { Report } from "@/types/report";
import api from "./api-config";

export interface ReportResponse {
  id: number;
  user_name: string;
  content: string;
  place: string;
  phone_number: string;
  status: string;
  attachment: string;
  created_at: string;
  updated_at: string;
}

export interface ReportListResponse {
  success: boolean;
  data: {
    reports: ReportResponse[];
  };
}

export const reportService = {
  getAllReports: async (): Promise<{ success: boolean; data: Report[] }> => {
    try {
      const response = await api.get<ReportListResponse>("/reports");

      if (response.data.success) {
        const reports = response.data.data.reports.map((report) => ({
          id: report.id,
          userName: report.user_name,
          content: report.content,
          place: report.place,
          phoneNumber: report.phone_number,
          status: report.status,
          attachment: report.attachment,
          reply: "",
          createdAt: report.created_at,
          updatedAt: report.updated_at,
        }));

        return { success: true, data: reports };
      }

      return { success: false, data: [] };
    } catch (error) {
      console.error("Error fetching reports:", error);
      return { success: false, data: [] };
    }
  },
};

export default reportService;
