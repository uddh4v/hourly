/* eslint-disable @typescript-eslint/no-explicit-any */

import { IProjectResponse } from "@/interface/Project";
import axiosInstance from "../AxiosInstance";

export const GetAllProjectsList = async (): Promise<IProjectResponse> => {
  const response = await axiosInstance.get<IProjectResponse>(
    "/api/project/getAllProjects"
  );
  return response.data;
};

export const GetAssignedProjectToUser = async (
  userId: string
): Promise<IProjectResponse> => {
  const response = await axiosInstance.get(
    `/api/project/assignedProject/${userId}`
  );
  return response.data;
};
