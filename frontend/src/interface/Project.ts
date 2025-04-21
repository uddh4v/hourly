export interface IProject {
  id: string;
  projectName: string;

  clientName: string;

  description: string;
  status: "active | completed | on hold";
  projectManager: string;
}

export interface IProjectResponse {
  status: string;
  message: string;
  projects: IProject[];
}
