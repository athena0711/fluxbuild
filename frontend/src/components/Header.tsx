import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { useGetAProject } from "@/hooks/projects";
import React from "react";
import { dashboardPage } from "@/constants";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, sectionId } = useParams<{
    projectId: string;
    sectionId: string;
  }>();
  const project = useGetAProject(projectId!);

  if (!project.data && project.isLoading) {
    navigate(dashboardPage);
    return null;
  }

  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean).slice(1);
  if (project.data) {
    return (
      <Breadcrumb>
        <BreadcrumbList className="capitalize">
          <BreadcrumbItem>
            <Link to={dashboardPage}>dashboard</Link>
            <BreadcrumbSeparator />
          </BreadcrumbItem>

          {paths.map((_, index) => {
            const url = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;

            return (
              <React.Fragment key={url}>
                {index > 0 && <BreadcrumbSeparator />}

                <BreadcrumbItem>
                  {isLast ? (
                    sectionId ? (
                      <span>{sectionId}</span>
                    ) : (
                      <span>{project.data.name}</span>
                    )
                  ) : projectId ? (
                    <span>{project.data.name}</span>
                  ) : null}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
};

export default Header;
