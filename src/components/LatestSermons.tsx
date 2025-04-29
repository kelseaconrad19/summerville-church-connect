
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Sermon } from "@/lib/types/sermons";
import SermonCard from "@/components/SermonCard";
import { Skeleton } from "@/components/ui/skeleton";

const LatestSermons = () => {
  // Fetch latest sermons from database
  const { data: sermons = [], isLoading } = useQuery({
    queryKey: ['home-latest-sermons'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('sermons')
          .select('*')
          .eq('is_published', true)
          .order('date', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching sermons:', error);
          throw error;
        }

        return data as Sermon[] || [];
      } catch (error) {
        console.error('Exception in sermons fetch:', error);
        return [];
      }
    },
  });

  // Format the date for display
  const formatSermonDate = (dateValue: string | Date): string => {
    return format(new Date(dateValue), "MMMM d, yyyy");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-10 w-1/3 mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sermons.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No sermons available at this time.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sermons.map((sermon) => (
        <SermonCard
          key={sermon.id}
          title={sermon.title}
          speaker={sermon.speaker}
          date={formatSermonDate(sermon.date)}
          description={sermon.description || ""}
          videoUrl={sermon.video_url}
          audioUrl={sermon.audio_url}
        />
      ))}
    </div>
  );
};

export default LatestSermons;
