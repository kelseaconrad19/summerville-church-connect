import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useQuery } from "@tanstack/react-query";
import { ClassFormData } from "@/components/admin/forms/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useEffect } from "react";

const classSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  teacher: z.string().min(1, { message: "Teacher name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  ministry_id: z.string().nullable(),
  image_url: z.string().nullable(),
  start_date: z.date().nullable(),
  end_date: z.date().nullable()
});

interface ClassFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingClass: ClassFormData | null;
  onSuccess: () => void;
}

export function ClassFormDialog({ 
  open, 
  onOpenChange, 
  editingClass, 
  onSuccess 
}: ClassFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof classSchema>>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      title: "",
      teacher: "",
      description: "",
      location: "",
      time: "",
      ministry_id: null,
      image_url: null,
      start_date: null,
      end_date: null
    }
  });

  // Fetch ministries for the dropdown
  const { data: ministries = [] } = useQuery({
    queryKey: ['ministries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ministries')
        .select('id, title')
        .order('title');
      
      if (error) {
        console.error('Error fetching ministries:', error);
        return [];
      }
      
      return data || [];
    }
  });

  // Reset form when dialog opens/closes or when editing class changes
  // The issue is here - useState doesn't take two arguments
  // Changing to use React.useEffect instead
  useEffect(() => {
    if (open) {
      if (editingClass) {
        form.reset({
          title: editingClass.title,
          teacher: editingClass.teacher,
          description: editingClass.description,
          location: editingClass.location,
          time: editingClass.time,
          ministry_id: editingClass.ministry_id,
          image_url: editingClass.image_url,
          start_date: editingClass.start_date || null,
          end_date: editingClass.end_date || null
        });
      } else {
        form.reset({
          title: "",
          teacher: "",
          description: "",
          location: "",
          time: "",
          ministry_id: null,
          image_url: null,
          start_date: null,
          end_date: null
        });
      }
    }
  }, [open, editingClass, form]);

  const onSubmit = async (data: z.infer<typeof classSchema>) => {
    setIsSubmitting(true);
    
    try {
      const classData = {
        title: data.title,
        teacher: data.teacher,
        description: data.description,
        location: data.location,
        time: data.time,
        ministry_id: data.ministry_id,
        image_url: data.image_url,
        start_date: data.start_date ? format(data.start_date, 'yyyy-MM-dd') : null,
        end_date: data.end_date ? format(data.end_date, 'yyyy-MM-dd') : null
      };

      if (editingClass) {
        // Update existing class
        const { error } = await supabase
          .from('classes')
          .update(classData)
          .eq('id', editingClass.id);
        
        if (error) throw error;
        
        toast.success('Class updated successfully');
      } else {
        // Create new class
        const { error } = await supabase
          .from('classes')
          .insert([classData]);
        
        if (error) throw error;
        
        toast.success('Class created successfully');
      }
      
      onSuccess();
    } catch (error: any) {
      console.error('Error saving class:', error);
      toast.error(`Failed to save class: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingClass ? "Edit Class" : "Create New Class"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Bible Study 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Room 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input placeholder="Sundays at 9:30 AM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        value={field.value ? format(field.value, 'yyyy-MM-dd') : ''} 
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : null;
                          field.onChange(date);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        value={field.value ? format(field.value, 'yyyy-MM-dd') : ''} 
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : null;
                          field.onChange(date);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ministry_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Ministry (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a ministry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {ministries.map((ministry) => (
                        <SelectItem key={ministry.id} value={ministry.id}>
                          {ministry.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the class..." 
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
                  <FormLabel>Class Image (Optional)</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value || ''} 
                      onChange={field.onChange} 
                      bucket="class_images"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingClass ? "Update Class" : "Create Class"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
