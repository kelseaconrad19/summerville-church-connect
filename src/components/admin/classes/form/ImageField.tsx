
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Control } from "react-hook-form";
import { ClassFormValues } from "./ClassFormSchema";

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
  );
}
