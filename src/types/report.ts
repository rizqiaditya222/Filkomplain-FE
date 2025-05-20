export interface Report {
  id: number;
  userName: string;
  content: string;
  place: string;
  phoneNumber: string;
  status: string;
  attachment: string;
  reply: string;
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
