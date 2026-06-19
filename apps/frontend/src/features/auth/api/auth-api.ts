import { api } from "@/lib/axios";
import type { SigninInput, SignupInput } from "../schemas/auth-schema";
import type { AuthResponse, User } from "../types";

export const signup = async (data: SignupInput): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/signup", data);
  return response.data;
};

export const signin = async (data: SigninInput): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/signin", data);
  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>("/auth/profile");
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
