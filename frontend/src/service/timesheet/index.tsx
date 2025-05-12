import { API_URL } from "..";
import axiosInstance from "../AxiosInstance";

export interface TimesheetEntry {
  userId: string;
  projectId: string;
  date: string;
  task: string;
  progress: "ongoing" | "completed" | "not started";
  hoursWorked: number;
  description: string;
  status: "submitted" | "pending" | "approved";
}

export interface Timesheet {
  _id: string;
  userId: string;
  date: string;
  entries: TimesheetEntry[];
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TimesheetResponse {
  message: string;
  timesheet: Timesheet;
}

export const submitTimesheet = async (timesheetData: TimesheetEntry) => {
  const response = await axiosInstance.post(
    `${API_URL}/api/timesheet/timesheetSubmit`,
    timesheetData
  );
  return response.data;
};

export const getTimesheetByUserId = async (
  userId: string
): Promise<TimesheetResponse> => {
  const response = await axiosInstance.get<TimesheetResponse>(
    `/api/user/${userId}`
  );
  return response.data;
};
