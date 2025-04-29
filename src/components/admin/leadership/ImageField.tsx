
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Control } from "react-hook-form";
import { LeadershipFormValues } from "./LeadershipFormSchema";

interface ImageFieldProps {
  control: Control<LeadershipFormValues>;
}

export function ImageField({ control }: ImageFieldProps) {
  return (
    <FormField
      control={control}
      name="image_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profile Image (Optional)</FormLabel>
          <FormControl>
            <ImageUpload 
              value={field.value || ''} 
              onChange={field.onChange} 
              bucket="leadership_images"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
