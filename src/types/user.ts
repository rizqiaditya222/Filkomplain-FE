export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  type: string;
}

export const createDefaultUser = (): User => ({
  id: 0,
  username: "",
  email: "",
  password: "",
  type: "user",
});
