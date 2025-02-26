import { useQuery, useMutation } from "@tanstack/react-query";
import Supabase from "@/lib/supabase";
import { ProjectAttributesT, ProjectsT } from "./types";
import { projectsTable } from "@/constants";
import { genericMutationResultFn } from "./utils";

export const getProjects = async (): Promise<ProjectsT[]> => {
  const { data, error } = await Supabase.from(projectsTable).select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as ProjectsT[];
};

export const useGetProjects = () => {
  return useQuery<ProjectsT[]>({
    queryKey: ["projectsTable"],
    queryFn: getProjects,
  });
};

export const addProjectQuery = async (project: ProjectAttributesT) => {
  return Supabase.from(projectsTable).insert([project]);
};

export const addProject = async (project: ProjectAttributesT) => {
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

export const getAProjectQuery = async (id: string) => {
  return Supabase.from(projectsTable).select("*").eq("id", id).single();
};

export const getAProject = async (id: string) => {
  const { data, error } = await getAProjectQuery(id);

  if (error) {
    throw new Error(error.message);
  }

  return data as ProjectsT;
};

export const useGetAProject = (id: string) => {
  return useQuery<ProjectsT, Error>({
    queryKey: [projectsTable, id],
    queryFn: () => getAProject(id),
  });
};
