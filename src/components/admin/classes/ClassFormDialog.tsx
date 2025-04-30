
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { ClassFormData } from "@/components/admin/forms/types";
import { classSchema, ClassFormValues } from "./form/ClassFormSchema";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { DateFields } from "./form/DateFields";
import { MinistryField } from "./form/MinistryField";
import { DescriptionField } from "./form/DescriptionField";
import { ImageField } from "./form/ImageField";
import { FormActions } from "./form/FormActions";
import { CheckCircle } from "lucide-react";

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
  
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      title: "",
      teacher: "",
      description: "",
      location: "",
      time: "",
      ministry_id: "none",
      image_url: null,
      start_date: null,
      end_date: null,
      is_published: false
    }
  });

  // Reset form when dialog opens/closes or when editing class changes
  useEffect(() => {
    if (open) {
      if (editingClass) {
        form.reset({
          title: editingClass.title,
          teacher: editingClass.teacher,
          description: editingClass.description,
          location: editingClass.location,
          time: editingClass.time,
          ministry_id: editingClass.ministry_id || "none",
          image_url: editingClass.image_url,
          start_date: editingClass.start_date || null,
          end_date: editingClass.end_date || null,
          is_published: editingClass.is_published || false
        });
      } else {
        form.reset({
          title: "",
          teacher: "",
          description: "",
          location: "",
          time: "",
          ministry_id: "none",
          image_url: null,
          start_date: null,
          end_date: null,
          is_published: false
        });
      }
    }
  }, [open, editingClass, form]);

  const onSubmit = async (data: ClassFormValues) => {
    setIsSubmitting(true);
    
    try {
      const classData = {
        title: data.title,
        teacher: data.teacher,
        description: data.description,
        location: data.location,
        time: data.time,
        ministry_id: data.ministry_id === "none" ? null : data.ministry_id,
        image_url: data.image_url,
        start_date: data.start_date ? format(data.start_date, 'yyyy-MM-dd') : null,
        end_date: data.end_date ? format(data.end_date, 'yyyy-MM-dd') : null,
        is_published: data.is_published
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
    } catch (error) {
      console.error('Error saving class:', error);
      toast.error(`Failed to save class: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">{editingClass ? "Edit Class" : "Create New Class"}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[75vh] px-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pr-4 pl-4">
              <div className="space-y-6 bg-muted/10 p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                <BasicInfoFields control={form.control} />
              </div>
              
              <div className="space-y-6 bg-muted/10 p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Class Schedule</h3>
                <DateFields control={form.control} />
              </div>
              
              <MinistryField control={form.control} />
              
              <DescriptionField control={form.control} />
              
              <div className="space-y-4 bg-muted/10 p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Class Image</h3>
                <ImageField control={form.control} />
              </div>

              <FormField
                control={form.control}
                name="is_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-6">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Publish Class
                      </FormLabel>
                      <FormDescription>
                        Make this class visible to the public
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormActions 
                isSubmitting={isSubmitting} 
                onCancel={handleCancel}
                isEditing={!!editingClass}
              />
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
