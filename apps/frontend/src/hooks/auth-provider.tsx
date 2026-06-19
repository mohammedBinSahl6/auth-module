import { type ReactNode } from "react";
import { getProfile, logout as logoutApi } from "@/features/auth/api/auth-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext, type AuthContextType } from "./auth-context";
import type { User } from "@/features/auth/types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const login = (newUser: User) => {
    queryClient.setQueryData(["profile"], newUser);
  };

  const logout = () => {
    logoutApi().then(() => {
      queryClient.setQueryData(["profile"], null);
      queryClient.clear();
    });
  };

  const value: AuthContextType = {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
