export interface IUser {
  _id: string;
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  designation: string;
  isApproved: boolean;
  isRemote: boolean;
  projects: string[];
  createdAt: string;
  updatedAt: string;
}
