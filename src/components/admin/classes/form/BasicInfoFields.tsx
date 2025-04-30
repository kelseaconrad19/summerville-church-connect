
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ClassFormValues } from "./ClassFormSchema";
import { BookOpen, User, MapPin } from "lucide-react";

interface BasicInfoFieldsProps {
  control: Control<ClassFormValues>;
}

export function BasicInfoFields({ control }: BasicInfoFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Class Title
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Bible Study 101" 
                className="mt-2"
                {...field} 
              />
            </FormControl>
            <FormDescription className="mt-1">
              Enter a clear, descriptive title for the class
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="teacher"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Teacher Name
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="John Doe" 
                className="mt-2"
                {...field} 
              />
            </FormControl>
            <FormDescription className="mt-1">
              Who will be teaching this class?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Room 101" 
                className="mt-2"
                {...field} 
              />
            </FormControl>
            <FormDescription className="mt-1">
              Where will the class be held?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
