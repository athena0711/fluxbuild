import Layout from "@/components/Layout";
import React, { useState } from "react";
import AddProject from "./NewProject";
import { useGetProjects } from "@/hooks/projects";

const Dashboard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: projects, isLoading, error } = useGetProjects();

  return (
    <Layout sidebarIsOpen={false}>
      <div className="h-full m-10">
        <div className="w-full flex justify-between items-center pb-2 border-b border-b-primary text-card-fluxbuildBlack font-semibold">
          <h1 className="text-2xl">Projects</h1>
          <h4
            className="cursor-pointer hover:text-gray-500"
            onClick={() => setIsDialogOpen(true)}
          >
            + Create New Project
          </h4>
          <AddProject
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        </div>
        <div className="mt-5">
          {isLoading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <p className="text-red-500">Error loading projects.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects?.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border rounded shadow-md bg-white"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <p>{project.created_at}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
