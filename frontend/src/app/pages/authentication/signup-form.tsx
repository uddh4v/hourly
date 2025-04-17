/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { createUser, CreateUserRequest } from "@/service/auth/login";
import { toast } from "sonner";
import { MultiSelectDropdown } from "@/components/customComponent/multiselect-dropdown";
// import { GetAllProjectsList, Project } from "@/service/project";

//

type SignupFormProps = React.ComponentProps<"form"> & {
  onSwitchToLogin: () => void;
};
export function SignupForm({
  className,
  onSwitchToLogin,
  ...props
}: SignupFormProps) {
  // const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    project: "",
  });

  console.log(formData);

  // useEffect(() => {
  //   getAllProjectList();
  // }, []);

  // const getAllProjectList = async () => {
  //   try {
  //     const response = await GetAllProjectsList();
  //     setProjects(response.projects);
  //     console.log("getAllProjectList", response.projects);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData: CreateUserRequest = {
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        role: formData.role as "user" | "manager",
        projects: formData.project,
        password: formData.password,
      };
      const response = await createUser(userData);
      if (response) {
        toast.success(response.status, {
          description: response.message,
        });
      }
      console.log("User created:", response);
    } catch (error: any) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message || "An unexpected error occurred.";

      // Show the error in the toast
      toast.error(`Error ${status}`, {
        description: message,
      });
    }
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleCreateUser}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a Account</h1>
        <p className="text-muted-foreground text-sm whitespace-nowrap">
          <p>Let's get started</p>Fill in the details below to create your
          account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex gap-4">
          <div className="w-1/2 grid gap-3">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              type="text"
              placeholder="John"
              required
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 grid gap-3">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              type="text"
              placeholder="Doe"
              required
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="role">Role</Label>
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="role">Project</Label>
          <MultiSelectDropdown
            options={[
              "cKUsFl",
              "swvvCt",
              "oisDAH",
              "tyZGeH",
              "AVkqPN",
              "XWpvut",
              "VpfNFZ",
              "dJluoh",
              "kwbFFC",
              "HTMxBa",
              "ADfMOy",
              "OHZfun",
              "DivUzJ",
              "WyeaCt",
              "RPmxgV",
              "gdLkfT",
              "TCCYTP",
              "GOECek",
              "jNEwLP",
              "MpBVOq",
              "nmhrZx",
              "wEGOKc",
              "ULNtmy",
              "JOXUHx",
              "YoPhiR",
              "RzrHur",
              "TIhDve",
              "sldqdu",
              "BEwjaE",
              "HbMsQF",
              "HigoiR",
              "TVQqVu",
              "muUooS",
              "nkSqpc",
              "MnGgFs",
              "BalbIO",
              "YKPDFy",
              "SXvHpa",
              "fRnCft",
              "sdEVyi",
              "ZUtMbp",
              "EDdSvj",
              "YiOaED",
              "YOsDlm",
              "AqNKFB",
              "KSoPFX",
              "vcJqjs",
              "xebHBt",
              "eGHxQR",
              "DemDpf",
            ]}
            selected={selected}
            onChange={setSelected}
          />
        </div>

        {/* <div className="grid gap-3">
          <Label htmlFor="project">Project</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, project: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Projects</SelectLabel>
                {projects.map((project) => (
                  <SelectItem key={project._id} value={project._id}>
                    {project.projectName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Signup
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have account?
        <a
          href="#"
          className="underline underline-offset-4"
          onClick={onSwitchToLogin}
        >
          &nbsp;Log in
        </a>
      </div>
    </form>
  );
}
