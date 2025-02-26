import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar";
import SidebarGlobal from "./SidebarGlobal";

interface LayoutT {
  // The sidebar component
  sidebar?: React.ReactNode;
  //   Sidebar width in pixels defaults to 350px
  sidebarWidth?: string;
  //   Sidebar open state defaults to true
  sidebarIsOpen?: boolean;
  //   Additional props for the sidebar main component
  sidebarProps?: typeof Sidebar;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutT> = ({
  sidebar,
  sidebarWidth = "250px",
  sidebarIsOpen = true,
  sidebarProps,
  children,
}) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": sidebarWidth,
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <Sidebar
        collapsible="icon"
        className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
        {...sidebarProps}
      >
        <SidebarGlobal sidebarIsOpen={sidebarIsOpen} />
        {sidebar}
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
