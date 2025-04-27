
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  description: string;
  image?: string;
}

const EventCard = ({ title, date, time, description, image }: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="text-sm text-church-blue font-medium mb-2">{date} • {time}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button 
          className="bg-church-blue hover:bg-blue-500 w-full"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
