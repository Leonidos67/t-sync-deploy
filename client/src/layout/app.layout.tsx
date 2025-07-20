import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import Asidebar from "@/components/asidebar/asidebar";
import Header from "@/components/header";
import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";

const AppLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex h-screen min-h-screen w-full">
          <Asidebar />
          <SidebarInset className="overflow-x-hidden flex-1">
            <div className="w-full">
              <Header />
              <div className="px-3 lg:px-20 py-3">
                <Outlet />
              </div>
              <CreateWorkspaceDialog />
              <CreateProjectDialog />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppLayout;
