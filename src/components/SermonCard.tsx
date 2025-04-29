
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SermonCardProps {
  title: string;
  speaker: string;
  date: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
}

const SermonCard = ({ title, speaker, date, description, videoUrl, audioUrl }: SermonCardProps) => {
  // Extract YouTube video ID from URL for thumbnail
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(videoUrl);
  const thumbnailUrl = youtubeId 
    ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
    : "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="overflow-hidden">
        <AspectRatio ratio={16/9}>
          <div className="w-full h-full bg-gray-100">
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform hover:scale-105" 
            />
          </div>
        </AspectRatio>
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{speaker}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          {videoUrl && (
            <Button 
              className="bg-church-blue hover:bg-blue-500"
            >
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">Watch</a>
            </Button>
          )}
          {audioUrl && (
            <Button 
              variant="outline"
              className="border-church-blue text-church-blue hover:bg-church-light-blue"
            >
              <a href={audioUrl} target="_blank" rel="noopener noreferrer">Listen</a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SermonCard;
