import { Report, convertResponseToReport, ReportResponse } from "@/types/report";
import api from "./api-config";

export interface ReportListResponse {
  success: boolean;
  data: {
    reports: ReportResponse[];
  };
}

export interface SingleReportResponse {
  success: boolean;
  data: ReportResponse;
}

export const reportService = {
  getAllReports: async (): Promise<{ success: boolean; data: Report[] }> => {
    try {
      const response = await api.get<ReportListResponse>("/reports");

      if (response.data.success) {
        const reports = response.data.data.reports.map(convertResponseToReport);
        return { success: true, data: reports };
      }

      return { success: false, data: [] };
    } catch (error) {
      console.error("Error fetching reports:", error);
      return { success: false, data: [] };
    }
  },

  getReportById: async (id: number): Promise<{ success: boolean; data: Report | null }> => {
    try {
      const response = await api.get<SingleReportResponse>(`/reports/${id}`);

      if (response.data.success) {
        const report = convertResponseToReport(response.data.data);
        return { success: true, data: report };
      }

      return { success: false, data: null };
    } catch (error) {
      console.error(`Error fetching report ${id}:`, error);
      return { success: false, data: null };
    }
  },

  updateReportStatus: async (id: number, status: string): Promise<{ success: boolean; data: Report | null }> => {
    try {
      // Use the new endpoint specifically for status updates
      const response = await api.patch<SingleReportResponse>(`/reports/${id}/status`, {
        status,
      });

      if (response.data.success) {
        const report = convertResponseToReport(response.data.data);
        return { success: true, data: report };
      }

      return { success: false, data: null };
    } catch (error) {
      console.error(`Error updating report ${id} status:`, error);
      return { success: false, data: null };
    }
  },
};

export default reportService;
