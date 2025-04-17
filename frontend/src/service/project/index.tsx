import axiosInstance from "../AxiosInstance";

export interface Project {
  _id: string;
  projectName: string;
  clientName: string;
  description: string;
  status: "active" | "inactive"; // You can extend this if there are more statuses
  projectManager: string; // Assuming this is a user ID
}

export interface ProjectsResponse {
  status: string;
  message: string;
  projects: Project[];
}
export const GetAllProjectsList = async (): Promise<ProjectsResponse> => {
  const response = await axiosInstance.get<ProjectsResponse>(
    "/api/project/getAllProjects"
  );
  return response.data;
};
