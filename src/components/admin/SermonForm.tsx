
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { SermonFormData } from "./forms/types";
import { SermonError } from "@/lib/types/sermons";

interface SermonFormProps {
  onSuccess: () => void;
  initialData?: SermonFormData;
}

export function SermonForm({ onSuccess, initialData }: SermonFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const form = useForm<SermonFormData>({
    defaultValues: initialData || {
      title: "",
      speaker: "",
      date: new Date(),
      description: "",
      series: "",
      video_url: "",
      audio_url: "",
      is_published: false,
    }
  });

  const onSubmit = async (data: SermonFormData) => {
    if (!user) {
      toast.error("You must be logged in to create sermons");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Format the date to ISO string for the database
      const formattedData = {
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
        created_by: user.id,
      };

      let result;
      
      if (isEditing && initialData?.id) {
        // Update existing sermon
        result = await supabase
          .from("sermons")
          .update(formattedData)
          .eq("id", initialData.id);
        
        if (result.error) throw result.error;
        toast.success("Sermon updated successfully");
      } else {
        // Insert new sermon
        result = await supabase
          .from("sermons")
          .insert(formattedData);
        
        if (result.error) throw result.error;
        toast.success("Sermon created successfully");
      }
      
      form.reset();
      onSuccess();
    } catch (error: SermonError) {
      console.error("Error saving sermon:", error);
      toast.error(`Error: ${error.message || "Failed to save sermon"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className="max-h-[70vh] px-2">
      <div className="pr-4 pl-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sermon Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sermon title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speaker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speaker</FormLabel>
                  <FormControl>
                    <Input placeholder="Speaker name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="series"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Series (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Sermon series" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter sermon description" 
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
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audio_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="URL to audio file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publish</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Make this sermon visible to the public
                    </div>
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

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={onSuccess}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditing ? "Update Sermon" : "Add Sermon"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
