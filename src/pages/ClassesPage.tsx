
import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClassWithMinistry } from "@/lib/types/classes";
import PageHeader from "@/components/PageHeader";
import ClassCard from "@/components/ClassCard";
import { Skeleton } from "@/components/ui/skeleton";

const ClassesPage = () => {
  // Fetch classes from database
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      try {
        const { data: classesData, error } = await supabase
          .from('classes')
          .select(`
            *,
            ministry:ministries(id, title)
          `)
          .order('title');

        if (error) {
          console.error('Error fetching classes:', error);
          throw error;
        }

        return classesData as ClassWithMinistry[] || [];
      } catch (error) {
        console.error('Exception in classes fetch:', error);
        return [];
      }
    },
  });

  if (isLoading) {
    return (
      <div>
        <PageHeader 
          title="Classes" 
          description="Join us for a variety of Bible studies and educational opportunities"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-10 w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div>
        <PageHeader 
          title="Classes" 
          description="Join us for a variety of Bible studies and educational opportunities"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500">
            No classes available at this time.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Classes" 
        description="Join us for a variety of Bible studies and educational opportunities"
        backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
