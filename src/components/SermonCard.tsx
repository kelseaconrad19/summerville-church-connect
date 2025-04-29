
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SermonCardProps {
  title: string;
  speaker: string;
  date: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
}

const SermonCard = ({ title, speaker, date, description, videoUrl, audioUrl }: SermonCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{speaker}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          {videoUrl && (
            <Button 
              className="bg-church-blue hover:bg-blue-500"
            >
              <a href={videoUrl}>Watch</a>
            </Button>
          )}
          {audioUrl && (
            <Button 
              variant="outline"
              className="border-church-blue text-church-blue hover:bg-church-light-blue"
            >
              Listen
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SermonCard;
