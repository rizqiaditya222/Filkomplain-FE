"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import authService, { ProfileData } from "@/services/auth-service";
import { getCookie } from "cookies-next";

interface AuthContextType {
  user: ProfileData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
  refreshUserProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      // Check both localStorage and cookies for token
      const token = typeof window !== "undefined" ? localStorage.getItem("token") || getCookie("token") : getCookie("token");

      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await authService.getProfile();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
        // If we can't fetch the profile with a token, the token might be invalid
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        authService.logout();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push("/login");
  };

  const refreshUserProfile = async () => {
    setIsLoading(true);
    await fetchUserProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
