export function mapStatus(status: string): string {
  switch (status) {
    case "pending":
      return "Diajukan";
    case "processing":
      return "Diproses";
    case "completed":
      return "Selesai";
    case "hold":
      return "Diajukan";
    default:
      return status;
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
    case "Active":
    case "active":
      return "bg-[#a6e7d8] text-[#048464] border border-[#048464]";
    default:
      return "bg-gray-200 text-gray-600";
  }
}

export interface LaporanFormat {
  Username: string;
  Title: string;
  Description: string;
  Location: string;
  Phone: string;
  Status: string;
}
