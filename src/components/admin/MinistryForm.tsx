
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { toast } from 'sonner';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { MinistryFormValues } from '@/lib/types/ministries';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image_url: z.string().default(''),
  contact_first_name: z.string().min(1, 'First name is required'),
  contact_last_name: z.string().min(1, 'Last name is required'),
  contact_email: z.string().email('Invalid email address'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  involvement_description: z.string().optional().nullable(),
  involvement_ways: z.array(z.string()).min(1, 'At least one way to get involved is required'),
  activities: z.array(z.string())
});

interface MinistryFormProps {
  initialData?: MinistryFormValues;
  onSuccess?: () => void;
}

export function MinistryForm({ initialData, onSuccess }: MinistryFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      image_url: '',
      contact_first_name: '',
      contact_last_name: '',
      contact_email: '',
      description: '',
      involvement_description: '',
      involvement_ways: [''],
      activities: ['', '', '', ''],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error('You must be logged in to create a ministry');
      return;
    }

    setIsLoading(true);
    try {
      const ministryData = {
        title: values.title,
        image_url: values.image_url || null,
        contact_first_name: values.contact_first_name,
        contact_last_name: values.contact_last_name,
        contact_email: values.contact_email,
        description: values.description,
        involvement_description: values.involvement_description || null,
        involvement_ways: values.involvement_ways.filter(way => way.trim() !== ''),
        activities: values.activities.filter(activity => activity.trim() !== ''),
        created_by: user.id
      };

      const { data, error } = await supabase
        .from('ministries')
        .insert(ministryData)
        .select()
        .single();

      if (error) {
        console.error('Error creating ministry:', error);
        toast.error('Failed to create ministry');
        throw error;
      }

      toast.success('Ministry created successfully');
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error('Exception creating ministry:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Helper to add another way to get involved
  const addInvolvementWay = () => {
    const currentWays = form.getValues('involvement_ways');
    form.setValue('involvement_ways', [...currentWays, '']);
  };

  // Helper to remove a way to get involved
  const removeInvolvementWay = (index: number) => {
    const currentWays = form.getValues('involvement_ways');
    if (currentWays.length > 1) {
      form.setValue(
        'involvement_ways',
        currentWays.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ministry Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Youth Ministry" {...field} />
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
              <FormLabel>Ministry Image</FormLabel>
              <FormControl>
                <ImageUpload 
                  value={field.value} 
                  onChange={field.onChange}
                  bucket="ministry_images"
                />
              </FormControl>
              <FormDescription>
                Upload an image representing the ministry
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="contact_first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the ministry's purpose, activities, and meeting times..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New fields for involvement information */}
        <div className="space-y-6 border-t pt-6 mt-6">
          <h3 className="text-lg font-medium">How To Get Involved</h3>
          
          <FormField
            control={form.control}
            name="involvement_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Involvement Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe how people can get involved with this ministry..."
                    className="min-h-24"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <FormLabel className="text-base">Ways To Get Involved</FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addInvolvementWay}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Way
              </Button>
            </div>
            
            {form.watch('involvement_ways').map((_, index) => (
              <div key={index} className="flex items-start gap-2">
                <FormField
                  control={form.control}
                  name={`involvement_ways.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          placeholder={`Way to get involved #${index + 1}`} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {index > 0 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeInvolvementWay(index)}
                    className="mt-0.5"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <FormLabel className="text-base">Ministry Activities</FormLabel>
            <p className="text-sm text-muted-foreground">
              List up to 4 recurring or important activities for this ministry
            </p>
            
            {[0, 1, 2, 3].map((index) => (
              <FormField
                key={index}
                control={form.control}
                name={`activities.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder={`Activity ${index + 1} (e.g., "Sunday Bible Study at 9:00 AM")`}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Ministry'}
        </Button>
      </form>
    </Form>
  );
}
