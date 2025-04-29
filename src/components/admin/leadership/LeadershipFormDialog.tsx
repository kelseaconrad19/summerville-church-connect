import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LeadershipMember, LeadershipRole } from "@/lib/types/leadership";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeadershipFormDialogProps {
  open: boolean;
  member: LeadershipMember | null;
  onClose: () => void;
  onSaved: () => void;
}

const leadershipFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["Leadership Team", "Shepherd", "Deacon"]),
  ministry: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  image_url: z.string().optional(),
  email: z.string().email("Invalid email address").optional().nullable(),
});

type LeadershipFormValues = z.infer<typeof leadershipFormSchema>;

export function LeadershipFormDialog({
  open,
  member,
  onClose,
  onSaved,
}: LeadershipFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!member;

  const form = useForm<LeadershipFormValues>({
    resolver: zodResolver(leadershipFormSchema),
    defaultValues: {
      name: member?.name || "",
      role: (member?.role as LeadershipRole) || "Leadership Team",
      ministry: member?.ministry || "",
      bio: member?.bio || "",
      image_url: member?.image_url || "",
      email: member?.email || "",
    },
  });

  const onSubmit = async (values: LeadershipFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing && member) {
        // Update existing member
        const { error } = await supabase
          .from("leadership")
          .update({
            name: values.name,
            role: values.role,
            ministry: values.ministry || null,
            bio: values.bio,
            image_url: values.image_url || null,
            email: values.email || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", member.id);

        if (error) throw error;
        toast.success("Leadership member updated successfully");
      } else {
        // Create new member
        const { error } = await supabase.from("leadership").insert({
          name: values.name,
          role: values.role,
          ministry: values.ministry || null,
          bio: values.bio,
          image_url: values.image_url || null,
          email: values.email || null,
        });

        if (error) throw error;
        toast.success("Leadership member added successfully");
      }

      onSaved();
    } catch (error) {
      console.error("Error saving leadership member:", error);
      toast.error("Failed to save leadership member");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Leadership Member" : "Add New Leadership Member"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Leadership Team">
                              Leadership Team
                            </SelectItem>
                            <SelectItem value="Shepherd">Shepherd</SelectItem>
                            <SelectItem value="Deacon">Deacon</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ministry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ministry (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Youth, Missions, etc."
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Short biography..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image (Optional)</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ""}
                          onChange={field.onChange}
                          bucket="leadership_images"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Update" : "Add"} Leadership Member
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
