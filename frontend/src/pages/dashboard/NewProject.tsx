import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddProject } from "@/hooks/projects";
import useAppState from "@/state";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Project name must be at least 2 characters.",
    })
    .max(50),
  description: z.string().max(50),
});

interface AddProjectProps {
  open: boolean;
  onClose: () => void;
}

const AddProject: React.FC<AddProjectProps> = ({ open, onClose }) => {
  const userInfo = useAppState((state) => state.userInfo);
  const addFn = useAddProject();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const projectData = {
      ...values,
      user_id: userInfo?.id,
    };

    addFn.mutate(projectData, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
    console.log(projectData);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-3/5 w-3/5">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 relative"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your project name here"
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
                  <FormItem className="grid">
                    <Label htmlFor="projectDescription">Description</Label>
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
              <Button className="absolute right-0" type="submit">
                Create Project
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
