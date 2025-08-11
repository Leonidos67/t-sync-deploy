import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EllipsisIcon, Loader, LogOut, User as UserIcon } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import LogoutDialog from "./logout-dialog";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { Separator } from "../ui/separator";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";

const Asidebar = () => {
  const { isLoading, user } = useAuthContext();

  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-full min-h-screen">
        <Sidebar collapsible="icon" className="flex-grow h-auto">
          <SidebarHeader className="!py-0 dark:bg-background">
            <div className="flex h-[50px] items-center justify-start w-full px-1">
              <Logo url={`/workspace/${workspaceId}`} />
              {open && (
                <Link
                  to={`/workspace/${workspaceId}`}
                  className=" md:flex ml-2 items-center gap-2 self-center font-medium"
                >
                  T-Sync
                  <span className="px-2 py-0.5 rounded-full bg-black text-white text-xs font-semibold">beta</span>
                </Link>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent className=" !mt-0 dark:bg-background">
            <SidebarGroup className="!py-0">
              <SidebarGroupContent>
                <WorkspaceSwitcher />
                <Separator />
                <NavMain />
                <Separator />
                <NavProjects />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="dark:bg-background">
            <SidebarMenu className={`transition-transform duration-200 ${!open ? '-translate-x-0' : ''}`}>
              <SidebarMenuItem>
                {isLoading ? (
                  <Loader
                    size="24px"
                    className="place-self-center self-center animate-spin"
                  />
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                      >
                        <Avatar className="h-8 w-8 rounded-full">
                          <AvatarImage src={user?.profilePicture || ""} />
                          <AvatarFallback className="rounded-full border border-gray-500">
                            {user?.name?.split(" ")?.[0]?.charAt(0)}
                            {user?.name?.split(" ")?.[1]?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {user?.name}
                          </span>
                          <span className="truncate text-xs">{user?.email}</span>
                        </div>
                        <EllipsisIcon className="ml-auto size-4" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                      side={"bottom"}
                      align="start"
                      sideOffset={4}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="!cursor-pointer" onClick={() => navigate(`/workspace/${workspaceId}/profile`)}>
                          <UserIcon />
                          Мой профиль
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem className="!cursor-pointer" onClick={() => setIsOpen(true)}>
                        <LogOut />
                        Выйти
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default Asidebar;
