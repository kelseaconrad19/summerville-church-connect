
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Sermons</h2>
        <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Catch up on recent messages from our Sunday services
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default LatestSermons;
