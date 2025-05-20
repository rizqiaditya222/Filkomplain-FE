export interface Report {
  id: number;
  userName: string;
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
  content: "",
  place: "",
  phoneNumber: "",
  status: "pending",
  attachment: "",
  reply: "",
});

export const convertResponseToReport = (response: ReportResponse): Report => ({
  id: response.id,
  userName: response.user_name,
  content: response.content,
  place: response.place,
  phoneNumber: response.phone_number,
  status: response.status,
  attachment: response.attachment,
  reply: response.reply || "",
  createdAt: response.created_at,
  updatedAt: response.updated_at,
});
