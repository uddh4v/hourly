import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Logs, Settings } from "lucide-react";
import Timesheet from "../timesheet/page";
import Dashboard from "../dashboard/dashboard";
import { useState } from "react";

export default function Main() {
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavClick = (page: string) => {
    setActivePage(page);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "timesheet":
        return <Timesheet />;
      case "logs":
        return <Logs />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar handleNavClick={handleNavClick} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          {/* Left side: sidebar trigger + breadcrumb */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {activePage !== "dashboard" && (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink
                        onClick={() => handleNavClick("dashboard")}
                        className="cursor-pointer"
                        to={""}
                      >
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right side: mode toggle */}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {renderActivePage()}
              </div>
            </div>
          </div>
          {/* <DashboardPointer /> */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
