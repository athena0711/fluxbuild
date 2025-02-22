import { NavUser } from "@/components/NavUser";
import Logo from "../assets/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { globalSidebarItems } from "@/constants";
import { useLocation, useNavigate } from "react-router";
import React, { useEffect } from "react";

interface SidebarGlobalT {
  sidebarIsOpen?: boolean;
}

const SidebarGlobal: React.FC<SidebarGlobalT> = ({ sidebarIsOpen }) => {
  const { setOpen } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    sidebarIsOpen && setOpen(true);
  }, []);

  return (
    <div>
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                    <img src={Logo} alt="Logo" className="w-6 h-6" />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {globalSidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        navigate(item.path);
                      }}
                      isActive={location.pathname.includes(item.path)}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default SidebarGlobal;
