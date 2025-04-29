import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LeadershipMember } from "@/lib/types/leadership";
import { leadershipSchema, LeadershipFormValues } from "./LeadershipFormSchema";
import { ImageField } from "./ImageField";

interface LeadershipFormDialogProps {
  open: boolean;
  member: LeadershipMember | null;
  onClose: () => void;
  onSaved: () => void;
}

export function LeadershipFormDialog({ 
  open, 
  member, 
  onClose, 
  onSaved 
}: LeadershipFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<LeadershipFormValues>({
    resolver: zodResolver(leadershipSchema),
    defaultValues: {
      name: "",
      role: "Leadership Team",
      ministry: "",
      bio: "",
      email: "",
      image_url: null,
      display_order: 100
    }
  });

  // Reset form when dialog opens/closes or when editing member changes
  useEffect(() => {
    if (open) {
      if (member) {
        form.reset({
          name: member.name,
          role: member.role,
          ministry: member.ministry || "",
          bio: member.bio || "",
          email: member.email || "",
          image_url: member.image_url,
          display_order: member.display_order || 100
        });
      } else {
        form.reset({
          name: "",
          role: "Leadership Team",
          ministry: "",
          bio: "",
          email: "",
          image_url: null,
          display_order: 100
        });
      }
    }
  }, [open, member, form]);

  const onSubmit = async (data: LeadershipFormValues) => {
    setIsSubmitting(true);
    
    try {
      const leadershipData = {
        name: data.name,
        role: data.role,
        ministry: data.ministry || null,
        bio: data.bio || "",
        email: data.email || null,
        image_url: data.image_url || null,
        display_order: data.display_order || 100
      };

      if (member) {
        // Update existing member
        const { error } = await supabase
          .from('leadership')
          .update(leadershipData)
          .eq('id', member.id);
        
        if (error) throw error;
        
        toast.success('Leadership member updated successfully');
      } else {
        // Create new member
        const { error } = await supabase
          .from('leadership')
          .insert([leadershipData]);
        
        if (error) throw error;
        
        toast.success('Leadership member created successfully');
      }
      
      onSaved();
    } catch (error: any) {
      console.error('Error saving leadership member:', error);
      toast.error(`Failed to save leadership member: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{member ? "Edit Leadership Member" : "Add New Leadership Member"}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pr-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
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
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Leadership Team">Leadership Team</SelectItem>
                        <SelectItem value="Shepherd">Shepherd</SelectItem>
                        <SelectItem value="Deacon">Deacon</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ministry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ministry Area (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Youth, Worship, Outreach" {...field} value={field.value || ''} />
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
                        placeholder="Email Address" 
                        {...field} 
                        value={field.value || ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="display_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="100" 
                        {...field}
                        value={field.value?.toString() || '100'}
                        onChange={e => field.onChange(parseInt(e.target.value) || 100)}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      Lower numbers display first (e.g. 10 displays before 20)
                    </p>
                  </FormItem>
                )}
              />

              <ImageField control={form.control} />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about this person..." 
                        className="min-h-[120px]" 
                        {...field} 
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {member ? "Update Member" : "Add Member"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
