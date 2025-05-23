import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";
import { useEffect } from "react";
import { GetAssignedProjectToUser } from "@/service/project";
import { useSelector } from "react-redux";
import { getUserId } from "@/store/selectors";

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      icon: SquareTerminal,
      isActive: false,
    },
    {
      title: "Timesheet",
      icon: Bot,
    },
    {
      title: "Logs",
      icon: BookOpen,
    },
    {
      title: "Settings",
      icon: Settings2,
    },
  ],
};
interface AppSidebarProps {
  handleNavClick: (page: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // to support other props passed to Sidebar
}

export function AppSidebar({ handleNavClick, ...props }: AppSidebarProps) {
  const userId = useSelector(getUserId) ?? "";
  useEffect(() => {
    const getProjects = async () => {
      // const userId = localStorage.getItem("userId") || "";
      try {
        const response = await GetAssignedProjectToUser(userId);
        if (response.status === "success") {
          console.log("projects:", response.projects);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [userId]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} handleNavClick={handleNavClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
