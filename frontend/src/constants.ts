import { ComputerIcon } from "lucide-react";

// PAGES
export const loginPage = "/login";
export const logoutPage = "/logout";
export const landingPage = "/";
export const dashboardPage = "/dashboard";
export const projectPage = "/projects";

// CREDENTIALS
export const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL! as string;
export const VITE_PUBLIC_SUPABASE_ANON_KEY = import.meta.env
  .VITE_PUBLIC_SUPABASE_ANON_KEY! as string;

// ADDITIONAL ENVS
export const VITE_ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT! as string;

//
// GLOBAL SIDEBAR
export const globalSidebarItems = [
  {
    title: "Dashboard",
    path: dashboardPage,
    icon: ComputerIcon,
    isActive: true,
  },
];

// TABLES
export const projectsTable = "Projects";
