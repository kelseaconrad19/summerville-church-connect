import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Sermon } from "@/lib/types/sermons";
import SermonCard from "@/components/SermonCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";

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

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="aspect-video w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-3/4 mb-4" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((index) => (
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

  // Get latest sermon and other sermons
  const latestSermon = sermons[0];
  const otherSermons = sermons.slice(1);

  return (
    <div>
      {/* Featured Latest Sermon */}
      {latestSermon && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Sermon</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {latestSermon.video_url && getYouTubeId(latestSermon.video_url) ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${getYouTubeId(latestSermon.video_url)}`}
                    title={latestSermon.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">Video not available</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{latestSermon.title}</h3>
              <p className="text-gray-600 mb-3">
                {latestSermon.speaker} • {formatSermonDate(latestSermon.date)}
              </p>
              {latestSermon.series && (
                <p className="mb-2 text-sm text-gray-500">Series: {latestSermon.series}</p>
              )}
              <p className="text-gray-700 mb-4">
                {latestSermon.description}
              </p>
              {latestSermon.video_url && (
                <Button 
                  className="bg-church-blue hover:bg-blue-500"
                  onClick={() => window.open(latestSermon.video_url, '_blank')}
                >
                  Watch
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Other Recent Sermons */}
      {otherSermons.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">More Recent Messages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherSermons.map((sermon) => (
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
      )}
    </div>
  );
};

export default LatestSermons;
