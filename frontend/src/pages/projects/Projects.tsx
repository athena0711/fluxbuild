import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { useGetAProject } from "@/hooks/projects";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectSidebarFeatures } from "./ProjectSidebar";
import { dashboardPage } from "@/constants";

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    navigate(dashboardPage);
    return null;
  }

  const { data: project, isLoading } = useGetAProject(projectId);
  if (isLoading && !project) {
    return <div></div>;
  }

  if (project) {
    return (
      <Layout sidebar={<ProjectSidebarFeatures />} sidebarIsOpen={true}>
        <div className="h-full m-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mt-5">xxx</div>
        </div>
      </Layout>
    );
  }
};

export default Projects;
