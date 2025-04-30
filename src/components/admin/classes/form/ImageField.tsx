
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Control } from "react-hook-form";
import { ClassFormValues } from "./ClassFormSchema";
import { ImageIcon } from "lucide-react";

interface ImageFieldProps {
  control: Control<ClassFormValues>;
}

export function ImageField({ control }: ImageFieldProps) {
  return (
    <FormField
      control={control}
      name="image_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Class Image
          </FormLabel>
          <FormDescription className="mt-1 mb-3">
            Upload an image to represent this class (optional)
          </FormDescription>
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
  );
}
