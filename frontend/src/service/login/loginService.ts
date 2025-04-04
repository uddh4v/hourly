import { IUser } from "@/interfaces/user/IUser";
import axiosInstance from "../axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;

  message: string;
  status: string;
  userId: string;
}

interface UserResponse {
  user: IUser;
}

export const login = async (credentials: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "api/user/login",
    credentials
  );
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.userId);
  return response.data;
};

export const getUser = async (): Promise<UserResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("No userId found");
  console.log(userId);

  const response = await axiosInstance.get<UserResponse>(`api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const logout = (): void => {
  try {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Optionally, clear other user-related data
    localStorage.removeItem("userId");

    // Redirect to login page (optional, depends on routing setup)
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
