import api from "./api-config";
import { setCookie, deleteCookie } from 'cookies-next';

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
  };
}

export interface ProfileData {
  id: number;
  email: string;
  username: string;
  nim: string;
  phone_number: string;
  program_studi: string;
  type: string;
}

export interface ProfileResponse {
  success: boolean;
  data: ProfileData;
}

export const authService = {
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/admin/register", userData);
    return response.data;
  },

  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/admin/login", credentials);

    if (response.data.success && response.data.data.token) {
      // Store token in both localStorage and cookies
      localStorage.setItem("token", response.data.data.token);
      setCookie('token', response.data.data.token, { 
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/' 
      });
    }

    return response.data;
  },

  getProfile: async (): Promise<{ success: boolean; data: ProfileData | null }> => {
    try {
      const response = await api.get<ProfileResponse>("/profile");

      if (response.data.success) {
        return { success: true, data: response.data.data };
      }

      return { success: false, data: null };
    } catch (error) {
      console.error("Error fetching profile:", error);
      return { success: false, data: null };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    deleteCookie('token');
  },
};

export default authService;
