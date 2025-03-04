import { createContext, useContext } from "react";

interface ProjectContextT {
  name?: string;
  description?: string;
}

const ProjectContext = createContext<ProjectContextT | null>(null);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a Project Provider");
  }
  return context;
};

export default ProjectContext;
