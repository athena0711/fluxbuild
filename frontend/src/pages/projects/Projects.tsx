import Layout from "@/components/Layout";
import React from "react";
import { useGetAProject } from "@/hooks/projects";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectSidebarFeatures } from "./ProjectSidebar";
import { dashboardPage } from "@/constants";
import Settings from "./Settings";
import Templates from "./Templates";
import About from "./About";
import Header from "@/components/Header";
import { SectionId } from "./types";

const tabComponents: Record<string, React.FC> = {
  about: About,
  settings: Settings,
  templates: Templates,
};

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, sectionId } = useParams<{
    projectId: string;
    sectionId: SectionId;
  }>();

  if (!projectId && sectionId) {
    navigate(dashboardPage);
    return null;
  }

  const { data: project, isLoading } = useGetAProject(projectId!);
  if (isLoading && !project) {
    return <div></div>;
  }

  const ActiveComponent = tabComponents[sectionId!];

  if (project) {
    return (
      <Layout
        sidebar={<ProjectSidebarFeatures sectionId={sectionId!} />}
        sidebarIsOpen={true}
      >
        <div className="h-full p-10">
          <Header />
          <ActiveComponent />
        </div>
      </Layout>
    );
  }
};

export default Projects;
