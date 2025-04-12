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

export interface UserResponse {
  status: "success" | "failed";
  message: string;
  user: User;
}
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    `${API_URL}/api/auth/login`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserById = async (userId: any): Promise<UserResponse> => {
  const response = await axiosInstance.get<UserResponse>(
    `/api/user/${userId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const LogoutUser = async () => {
  const response = await axiosInstance.post(`/api/auth/logout`);
  return response.data;
};
