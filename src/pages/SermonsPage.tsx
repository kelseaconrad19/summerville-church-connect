
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import SermonCard from "@/components/SermonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Sermon } from "@/lib/types/sermons";

const SermonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [selectedSpeaker, setSelectedSpeaker] = useState("all");
  
  // Fetch sermons from database
  const { data: sermons = [], isLoading } = useQuery({
    queryKey: ['public-sermons'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('sermons')
          .select('*')
          .eq('is_published', true)
          .order('date', { ascending: false });

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

  // Extract latest sermon for feature display
  const latestSermon = sermons.length > 0 ? sermons[0] : null;
  
  // Extract unique series and speakers for filters
  const seriesList = [...new Set(sermons.map((sermon: Sermon) => sermon.series).filter(Boolean))];
  const speakersList = [...new Set(sermons.map((sermon: Sermon) => sermon.speaker))];
  
  // Filter sermons based on search and filters
  const filteredSermons = sermons.filter((sermon: Sermon) => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (sermon.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesSeries = selectedSeries === "all" || sermon.series === selectedSeries;
    const matchesSpeaker = selectedSpeaker === "all" || sermon.speaker === selectedSpeaker;
    
    return matchesSearch && matchesSeries && matchesSpeaker;
  });

  // Format the date for display - updated to handle both string and Date types
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

  return (
    <div>
      <PageHeader 
        title="Sermons"
        description="Listen to and watch recent messages from our services"
        backgroundImage="/images/sermons.jpg"
      />
      
      <section className="section-padding bg-white">
        <div className="page-container">
          {/* Featured Sermon */}
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
                  <h3 className="text-xl font-bold mb-2">{latestSermon.title}</h3>
                  <p className="text-gray-500 mb-3">{latestSermon.speaker} • {formatSermonDate(latestSermon.date)}</p>
                  <p className="text-gray-700 mb-4">
                    {latestSermon.description}
                  </p>
                  <div className="flex space-x-3">
                    {latestSermon.video_url && (
                      <Button 
                        className="bg-church-blue hover:bg-blue-500"
                        onClick={() => window.open(latestSermon.video_url, '_blank')}
                      >
                        Watch
                      </Button>
                    )}
                    {latestSermon.audio_url && (
                      <Button 
                        variant="outline" 
                        className="border-church-blue text-church-blue hover:bg-church-light-blue"
                        onClick={() => window.open(latestSermon.audio_url, '_blank')}
                      >
                        Download Audio
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Sermon Search and Filters */}
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Find Sermons</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  type="text"
                  placeholder="Search sermons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Series</SelectItem>
                    {seriesList.map((series) => (
                      <SelectItem key={series} value={series}>{series}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Speaker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Speakers</SelectItem>
                    {speakersList.map((speaker) => (
                      <SelectItem key={speaker} value={speaker}>{speaker}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Loading state */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-lg">Loading sermons...</div>
            </div>
          ) : (
            <>
              {/* Sermon List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSermons.map((sermon: Sermon) => (
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
              
              {filteredSermons.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No sermons found matching your criteria.</p>
                </div>
              )}
              
              {sermons.length > 6 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="border-church-blue text-church-blue hover:bg-church-light-blue">
                    Load More Sermons
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SermonsPage;
