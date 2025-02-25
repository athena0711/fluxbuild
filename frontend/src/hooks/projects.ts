import { useQuery, useMutation } from "@tanstack/react-query";
import Supabase from "@/lib/supabase";
import { ProjectAttributes, ProjectAttributesT } from "./types";
import { projectsTable } from "@/constants";
import { genericMutationResultFn } from "./utils";


export const getProjects = async (): Promise<ProjectAttributesT[]> => {
  const { data, error } = await Supabase.from(projectsTable).select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as ProjectAttributesT[];
};

export const useGetProjects = () => {
  return useQuery<ProjectAttributesT[]>({
    queryKey: ["projectsTable"],
    queryFn: getProjects,
  });
};

export const addProjectQuery = async (project: ProjectAttributes) => {
  return Supabase.from(projectsTable).insert([project]);
};

export const addProject = async (project: ProjectAttributes) => {
  const { error } = await addProjectQuery(project);

  if (error) {
    throw new Error(error.message);
  }
};

export const useAddProject = () => {
  return useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      genericMutationResultFn.onSuccess({ queryKeys: [projectsTable] });
    },
  });
};
