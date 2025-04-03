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
  email: string;
  avatar: string;
  full_name: string;
}

export const login = async (credentials: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "api/user/login",
      credentials
    );

    // Save token to localStorage or context for future requests
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getUser = async (): Promise<UserResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("No userId found");
    console.log(userId);

    const response = await axiosInstance.get<UserResponse>(
      `api/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
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
