
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { toast } from 'sonner';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
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
