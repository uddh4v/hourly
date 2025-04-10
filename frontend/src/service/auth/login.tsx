import { User } from "@/interface/User";
import axiosInstance from "../AxiosInstance";
import { API_URL } from "../index";

export interface LoginRequest {
  email: string;
  password: string;
}

// Response payload type (customize based on your backend)
export interface LoginResponse {
  status: "success" | "failed";
  message: string;
  userId: string;
}
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    `${API_URL}/api/user/login`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserById = async (userId: any): Promise<User> => {
  const response = await axiosInstance.get<User>(`/api/user/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};
