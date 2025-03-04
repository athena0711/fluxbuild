import { useUpdateProject, useDeleteProject } from "@/hooks/projects";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { dashboardPage } from "@/constants";
import { Separator } from "@/components/ui/separator";
import { useProjectContext } from "./context";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Project name must be at least 2 characters.",
    })
    .max(50),
  description: z.string().max(50),
});

const Settings = () => {
  const { name, description } = useProjectContext();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { projectId } = useParams<{ projectId: string }>();
  const updateFn = useUpdateProject(projectId!);
  const deleteFn = useDeleteProject();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      description: description,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const projectData = {
      ...values,
      id: projectId,
    };

    updateFn.mutate(projectData, {
      onSuccess: () => {
        form.reset(values);
      },
    });
  }

  const handleDelete = () => {
    deleteFn.mutate(projectId!);
    navigate(dashboardPage);
  };

  return (
    <div className="space-y-10">
      <h6 className="my-2 text-sm text-gray-600">
        Customize your project settings to fit your needs.
      </h6>
      <div className="w-1/2 border-2 border-gray-300 rounded-xl p-5 mx-auto my-5 py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-semibold">Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your new project name here"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="projectDescription"
                    className=" font-semibold"
                  >
                    Description
                  </Label>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      {...field}
                      className="border-card-fluxbuildBlack"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end h-8 space-x-2">
              <Button type="submit">Update Project</Button>
              <Separator orientation="vertical" color="black" />
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button>Delete project</Button>
                </DialogTrigger>
                <DialogContent>
                  <h1 className="font-semibold text-xl">
                    Are you sure you want to delete this project?
                  </h1>
                  <p>This action cannot be undone.</p>
                  <DialogFooter>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleDelete} className="hover:bg-red-200">
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Settings;
